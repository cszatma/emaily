// @flow

import type { $Response, NextFunction } from 'express';
import type { session$Request } from 'emaily-types';

/**
 * Checks that the user is authenticated before moving on to the next middleware
 */
export default (req: session$Request, res: $Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in!' });
    }

    next();
};
