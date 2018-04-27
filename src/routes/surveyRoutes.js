// @flow

import mongoose from 'mongoose';
import type { $Application, $Response } from 'express';
import type { survey$Request } from 'emaily-types';

import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import Mailer from '../services/Mailer';
import surveyTemplate from '../services/email-templates/surveyTemplate';

const Survey = mongoose.model('surveys');

export default (app: $Application) => {
    app.get('/api/surveys/thanks', (req, res: $Response) => {
        res.send('Thanks for voting!');
    });

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req: survey$Request, res: $Response) => {
            // recipients is a string of comma separated emails
            const { title, subject, body, recipients } = req.body;
            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients
                    .split(',')
                    .map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSend: Date.now(),
            });

            const mailer = new Mailer(survey, surveyTemplate(survey));

            try {
                await mailer.send();
                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();

                res.send(user);
            } catch (error) {
                res.status(422).send(error);
            }
        },
    );
};
