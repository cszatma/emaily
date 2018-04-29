import { NextFunction, Response } from 'express';
import { SessionRequest } from '../types/routing';

/**
 * Checks that the user is has enough credits before moving on to the next middleware
 */
export default (req: SessionRequest, res: Response, next: NextFunction) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
};
