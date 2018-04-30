/* tslint:disable:object-literal-sort-keys */

import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

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

const Survey: mongoose.Model<SurveyModel> = mongoose.model('surveys');

export default (app: Express) => {
    app.get('/api/surveys/thanks', (req: Request, res: Response) => {
        res.send('Thanks for voting!');
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
                    .map(email => ({ email: email.trim() })),
                _user: user.id,
                dateSend: Date.now(),
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
