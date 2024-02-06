import express from 'express';
import { createShoe, deleteShoe, getAllShoes, getShoe, updatedShoe } from '../controllers/shoeControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllShoes);
router.get('/:id',getShoe);

router.use(verifyJwt);
router.post('/new',createShoe);
router.patch('/update/:id',updatedShoe);
router.delete('/delete/:id',deleteShoe);

export default router;
