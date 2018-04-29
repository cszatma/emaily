import { NextFunction, Response } from 'express';
import { SessionRequest } from '../types/routing';

/**
 * Checks that the user is authenticated before moving on to the next middleware
 */
export default (req: SessionRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in!' });
    }

    next();
};
