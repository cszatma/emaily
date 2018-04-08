// @flow

import stripeApi from 'stripe';
import type { $Application, $Response, NextFunction } from 'express';
import type { billing$Request, StripeToken } from 'emaily-types';

import keys from '../config/keys';

const stripe = stripeApi(keys.stripeSecretKey);

export default (app: $Application) => {
    app.post(
        '/api/stripe',
        async (req: billing$Request, res: $Response, next: NextFunction) => {
            if (!req.body || typeof req.body !== 'object') {
                res
                    .status(500)
                    .send(
                        'Invalid body in request. Expected an object representing a stripe response token.',
                    );
                return next();
            }

            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id,
            });

            console.log(charge);
        },
    );
};
