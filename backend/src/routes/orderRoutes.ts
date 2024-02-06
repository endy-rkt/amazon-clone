import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrder, getOrderByUserId } from '../controllers/orderControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router = express.Router();

router.use(verifyJwt);
router.get('/all',getAllOrders);
router.get('/list',getOrderByUserId);
router.post('/new',createOrder);
router.delete('/delete/:id',deleteOrder);
router.get('/:id',getOrder);

export default router;