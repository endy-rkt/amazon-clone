import express from 'express';
import { createClothe, deleteClothe, getAllClothes, getClothe, updatedClothe } from '../controllers/clotheControllers';

const router =  express.Router();

router.get('/all',getAllClothes);
router.post('/new',createClothe);
router.patch('/update/:id',updatedClothe);
router.delete('/delete/:id',deleteClothe);
router.get('/:id',getClothe);

export default router;
