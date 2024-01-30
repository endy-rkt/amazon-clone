import express from 'express';
import { createComputer, deleteComputer, getAllComputers, getComputer, updatedComputer } from '../controllers/computerControllers';

const router =  express.Router();

router.get('/all',getAllComputers);
router.post('/new',createComputer);
router.patch('/update/:id',updatedComputer);
router.delete('/delete/:id',deleteComputer);
router.get('/:id',getComputer);

export default router;
