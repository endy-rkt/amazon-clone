import express from 'express';
import { createComputer, deleteComputer, getAllComputers, getComputer, updatedComputer } from '../controllers/computerControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllComputers);
router.get('/:id',getComputer);

router.use(verifyJwt);
router.post('/new',createComputer);
router.patch('/update/:id',updatedComputer);
router.delete('/delete/:id',deleteComputer);

export default router;
