import express from "express"
import { AuthController } from "../controller/authController";

export const router = express.Router();

router.post('/login', [AuthController.login]);