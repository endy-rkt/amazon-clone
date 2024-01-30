import express from 'express';
import { createHat, deleteHat, getAllHats, getHat, updatedHat } from '../controllers/hatControllers';

const router =  express.Router();

router.get('/all',getAllHats);
router.post('/new',createHat);
router.patch('/update/:id',updatedHat);
router.delete('/delete/:id',deleteHat);
router.get('/:id',getHat);

export default router;
