import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import User from  '../models/user.model.js';


const secret = process.env.JWT_SECTER;

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log(secret);

    try {
        const { name, email, password} = req.body;

        const currentUser = await User.findOne({email});

        if(currentUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{name, email, password: hashedPassword}], {session})
        console.log(JWT_SECTER)
        const token = jwt.sign({userId: newUser[0]._id, secret})

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User creates successufully',
            date: {
                token,
                user: newUser[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const signIn = async (req, res, next) => {

}

export const signOut = async (req, res, next) => {

}