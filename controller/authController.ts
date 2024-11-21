import { NextFunction, Request, Response } from "express";
import User from "../entity/user.entity";

const login = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        if(email === "" || password === "") {
            res.status(400).json({
                message: "Some fields are empty"
            });
            return;
        }

        const user = await User.findOne({email});
        if(!user) {
            res.status(401).json({
                message: "User not authorized"
            });
            return;
        }

        const isPasswordMatch = password === user.password;
        if(!isPasswordMatch) {
            res.status(403).json({
                message: "Password incorrect"
            });
            return;
        }

        res.status(200).json({
            message: "User authorized",
            data: user
        });

    } catch (error) {
        next(error);
    }
}

export const AuthController = {
    login
}