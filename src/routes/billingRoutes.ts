import { Express, NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';

import keys from '../config/keys';
import requireLogin from '../middlewares/requireLogin';
import { UserModel } from '../models/User';

const stripe = new Stripe(keys.stripeSecretKey);

export default (app: Express) => {
    app.post(
        '/api/stripe',
        requireLogin,
        async (req: Request, res: Response, next: NextFunction) => {
            // Verify that a body was passed and that it's and object
            if (!req.body || typeof req.body !== 'object') {
                res.status(400).send({
                    error:
                        'Invalid body in request.' +
                        'Expected an object representing a stripe response token.',
                });
                return next();
            }

            // Create a charge then update the user model
            await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id,
            });

            const user = req.user as UserModel;

            user.credits += 5;
            const updatedUser = await user.save();

            res.send(updatedUser);
        },
    );
};
