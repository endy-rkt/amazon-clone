import express from 'express';
import { createHat, deleteHat, getAllHats, getHat, updatedHat } from '../controllers/hatControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllHats);
router.get('/:id',getHat);

router.use(verifyJwt);
router.post('/new',createHat);
router.patch('/update/:id',updatedHat);
router.delete('/delete/:id',deleteHat);

export default router;
