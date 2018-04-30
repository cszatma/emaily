import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../models/User';

/**
 * Checks that the user is has enough credits before moving on to the next middleware
 */
export default (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as UserModel).credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
};
