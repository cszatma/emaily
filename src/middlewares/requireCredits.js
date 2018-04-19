// @flow

import type { $Response, NextFunction } from 'express';
import type { session$Request } from 'emaily-types';

/**
 * Checks that the user is has enough credits before moving on to the next middleware
 */
export default (req: session$Request, res: $Response, next: NextFunction) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
};
