// @flow

import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String,
});

mongoose.model('users', UserSchema);
