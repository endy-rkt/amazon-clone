import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllUsers);
router.post('/new',createUser);
router.get('/:id',getUser);
router.use(verifyJwt);
router.patch('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);

export default router;
