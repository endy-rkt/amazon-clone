import express from 'express';
import { createWatch, deleteWatch, getAllWatches, getWatch, updatedWatch } from '../controllers/watchControllers';

const router =  express.Router();

router.get('/all',getAllWatches);
router.post('/new',createWatch);
router.patch('/update/:id',updatedWatch);
router.delete('/delete/:id',deleteWatch);
router.get('/:id',getWatch);

export default router;
