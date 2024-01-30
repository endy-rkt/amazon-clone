import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, getOrderByUserId } from '../controllers/orderControllers';

const router = express.Router();

router.get('/all',getAllOrders);
router.get('/list',getOrderByUserId);
router.post('/new',createOrder);
router.delete('/delete/:id',deleteOrder);
router.get('/:id',getOrder);

export default router;