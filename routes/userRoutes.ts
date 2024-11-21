import express, { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/userController";

export const router = express.Router();

router.get("/", [UserController.getAllUsers]);
router.post("/", [UserController.createUser]);
router.get("/:id", [UserController.getUserById]);
