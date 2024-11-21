import express from "express";
import { router as userRoutes } from "./userRoutes";
import { router as authRoutes } from "./authRoutes";

export const router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

