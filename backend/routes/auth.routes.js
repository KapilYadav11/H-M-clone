import express, { Router } from 'express';
import {
    registerController,
    loginController,
    logoutController
} from '../controller/auth.controller.js';

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("logout", logoutController);