import express from 'express';
import { login, logout, refreshAuth } from '../controllers/authControllers';

const router = express.Router();

router.post('/login',login);
router.post('/refresh',refreshAuth);
router.post('/logout',logout);

export default router;
