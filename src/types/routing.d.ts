import { Request } from 'express';

import { UserModel } from '../models/User';

export interface SessionRequest extends Request {
    user: UserModel;
}
