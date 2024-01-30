import express from 'express';
import { createPhone, deletePhone, getAllPhones, getPhone, updatedPhone } from '../controllers/phoneControllers';

const router =  express.Router();

router.get('/all',getAllPhones);
router.post('/new',createPhone);
router.patch('/update/:id',updatedPhone);
router.delete('/delete/:id',deletePhone);
router.get('/:id',getPhone);

export default router;
