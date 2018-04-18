// @flow

import stripeApi from 'stripe';
import type { $Application, $Response, NextFunction } from 'express';
import type { billing$Request } from 'emaily-types';

import keys from '../config/keys';
import requireLogin from '../middlewares/requireLogin';

const stripe = stripeApi(keys.stripeSecretKey);

export default (app: $Application) => {
    app.post(
        '/api/stripe',
        requireLogin,
        async (req: billing$Request, res: $Response, next: NextFunction) => {
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

            req.user.credits += 5;
            const user = await req.user.save();

            res.send(user);
        },
    );
};
