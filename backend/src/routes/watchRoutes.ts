import express from 'express';
import { createWatch, deleteWatch, getAllWatches, getWatch, updatedWatch } from '../controllers/watchControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllWatches);
router.get('/:id',getWatch);

router.use(verifyJwt);
router.post('/new',createWatch);
router.patch('/update/:id',updatedWatch);
router.delete('/delete/:id',deleteWatch);

export default router;
