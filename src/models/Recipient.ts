import mongoose from 'mongoose';

export type RecipientModel = mongoose.Document & {
    email: string;
    responded: boolean;
};

const recipientSchema = new mongoose.Schema({
    email: String,
    responded: {
        default: false,
        type: Boolean,
    },
});

export default recipientSchema;
