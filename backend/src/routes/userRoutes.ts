import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userControllers';

const router =  express.Router();

router.get('/all',getAllUsers);
router.get('/',getUser);
router.post('/new',createUser);
router.patch('/update',updateUser);
router.delete('/delete',deleteUser);


export default router;
