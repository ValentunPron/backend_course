import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLegth: 2,
        maxLegth: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email']
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minLegth: 6
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;