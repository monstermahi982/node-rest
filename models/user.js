import { number, string } from 'joi';
import mongoose from 'mongoose';

const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', UserSchema, 'users')