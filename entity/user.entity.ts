import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    pays: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);