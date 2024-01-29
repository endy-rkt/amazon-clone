import express from 'express';
import { createClothe, deleteClothe, getAllClothes, getClothe, updatedClothe } from '../controllers/clotheControllers';

const router =  express.Router();

router.get('/all',getAllClothes);
router.get('/:id',getClothe);
router.post('/new',createClothe);
router.patch('/update/:id',updatedClothe);
router.delete('/delete/:id',deleteClothe);

export default router;
