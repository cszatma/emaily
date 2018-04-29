/* tslint:disable:object-literal-sort-keys */

import mongoose from 'mongoose';

import recipientSchema, { RecipientModel } from './Recipient';

export type SurveyModel = mongoose.Document & {
    body: string;
    recipients: mongoose.Model<RecipientModel>[];
    subject: string;
    title: string;
    yes: number;
    no: number;
    _user: mongoose.Schema.Types.ObjectId;
    dateSent: Date;
    lastResponded: Date;
};

const surveySchema = new mongoose.Schema({
    body: String,
    recipients: [recipientSchema],
    subject: String,
    title: String,
    yes: {
        type: Number,
        default: 0,
    },
    no: {
        default: 0,
        type: Number,
    },
    _user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    dateSent: Date,
    lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
