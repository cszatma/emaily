import mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
    credits: number;
    googleId: string;
};

const userSchema = new mongoose.Schema({
    credits: {
        default: 0,
        type: Number,
    },
    googleId: String,
});

mongoose.model('users', userSchema);
