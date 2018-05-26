import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import Path from 'path-parser';
import { URL } from 'url';
import { Optional } from 'aliases';
import _ from 'lodash';

import requireCredits from '../middlewares/requireCredits';
import requireLogin from '../middlewares/requireLogin';
import { SurveyModel } from '../models/Survey';
import { UserModel } from '../models/User';
import surveyTemplate from '../services/email-templates/surveyTemplate';
import Mailer from '../services/Mailer';

interface Body {
    title: string;
    subject: string;
    body: string;
    recipients: string;
}

interface MailEvent {
    email: string;
    url: string;
}

interface SurveyResponse {
    email: string;
    surveyId: string;
    choice: string;
}

const Survey: mongoose.Model<SurveyModel> = mongoose.model('surveys');

export default (app: Express) => {
    app.get(
        '/api/surveys',
        requireLogin,
        async (req: Request, res: Response) => {
            const surveys = await Survey.find({ _user: req.user!.id }).select({
                recipients: 0,
            });

            res.send(surveys);
        },
    );

    app.get('/api/surveys/:surveyId/:choice', (req: Request, res: Response) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req: Request, res: Response) => {
        const parser = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body as MailEvent[])
            .map(({ email, url }: MailEvent): Optional<SurveyResponse> => {
                const match: any = parser.test(new URL(url).pathname);

                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice,
                    };
                }
            })
            .compact()
            .uniqBy('email')
            .uniqBy('surveyId')
            .each(({ surveyId, email, choice }: SurveyResponse) =>
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email, responded: false },
                        },
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date(),
                    },
                ).exec(),
            );

        res.send({});
    });

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req: Request, res: Response) => {
            // recipients is a string of comma separated emails
            const { title, subject, body, recipients } = req.body as Body;
            const user = req.user as UserModel;

            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients
                    .split(',')
                    .map(email => ({ email: email.trim() }))
                    .filter(recipient => !!recipient.email),
                _user: user.id,
                dateSent: new Date(),
            });

            const mailer = new Mailer(survey, surveyTemplate(survey));

            try {
                await mailer.send();
                await survey.save();
                user.credits -= 1;
                const updatedUser = await user.save();

                res.send(updatedUser);
            } catch (error) {
                res.status(422).send(error);
            }
        },
    );
};
