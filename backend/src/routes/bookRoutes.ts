import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updatedBook } from '../controllers/bookControllers';
import { verifyJwt } from '../middlewares/verifyJwt';

const router =  express.Router();

router.get('/all',getAllBooks);
router.get('/:id',getBook);

router.use(verifyJwt);
router.post('/new',createBook);
router.patch('/update/:id',updatedBook);
router.delete('/delete/:id',deleteBook);


export default router;
