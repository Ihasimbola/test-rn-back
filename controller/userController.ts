import { NextFunction, Request, Response } from "express";
import User from "../entity/user.entity";
import mongoose from "mongoose";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email, phone, pays, region } = req.body;
  if (username === "" || password === "" || email === "" || phone === "" || pays === "" || region === "") {
    res.status(400).json({
      message: "Some fields are empty",
    });
    return;
  }

  try {
    const user = await User.create({
      username,
      password,
      email,
      phone, 
      pays,
      region
    });

    const newUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });

  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      message: "All users",
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: "Invalid id",
      });
      return;
    }

    const user = await User.findById(id);
    if(!user) {
        res.status(404).json({
            message: "User not found"
        })
        return;
    }

    res.status(200).json({
      message: "User found",
      data: user,
    });

  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
};
