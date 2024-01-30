import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userControllers';

const router =  express.Router();

router.get('/all',getAllUsers);
router.post('/new',createUser);
router.patch('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/:id',getUser);

export default router;
