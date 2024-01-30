import express from 'express';
import { createShoe, deleteShoe, getAllShoes, getShoe, updatedShoe } from '../controllers/shoeControllers';

const router =  express.Router();

router.get('/all',getAllShoes);
router.post('/new',createShoe);
router.patch('/update/:id',updatedShoe);
router.delete('/delete/:id',deleteShoe);
router.get('/:id',getShoe);

export default router;
