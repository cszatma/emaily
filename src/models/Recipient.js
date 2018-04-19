// @flow

import mongoose from 'mongoose';

const { Schema } = mongoose;

const RecipientSchema = new Schema({
    email: String,
    responded: {
        type: Boolean,
        default: false,
    },
});

export default RecipientSchema;
