import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userControllers';

const router =  express.Router();

router.get('/all',getAllUsers);
router.get('/:id',getUser);
router.post('/new',createUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);


export default router;
