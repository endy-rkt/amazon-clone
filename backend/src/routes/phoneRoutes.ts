import express from 'express';
import { createPhone, deletePhone, getAllPhones, getPhone, updatedPhone } from '../controllers/phoneControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllPhones);
router.get('/:id',getPhone);

router.use(verifyJwt);
router.post('/new',createPhone);
router.patch('/update/:id',updatedPhone);
router.delete('/delete/:id',deletePhone);

export default router;
