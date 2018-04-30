/* tslint:disable:ordered-imports */

import mongoose from 'mongoose';

import keys from './config/keys';
import './models/User';
import './models/Survey';
import './services/passport';
import dev from './utils/dev-utils';
import app from './app';

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    dev.log.green(`Server successfully started on port ${PORT}\n`);
});
