import express from 'express';
import { login, logout, refreshAuth } from '../controllers/authControllers';

const router = express.Router();

router.post('/login',login);
router.get('/refresh',refreshAuth);
router.post('/logout',logout);

export default router;

