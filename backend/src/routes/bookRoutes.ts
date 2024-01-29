import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updatedBook } from '../controllers/bookControllers';

const router =  express.Router();

router.get('/all',getAllBooks);
router.get('/:id',getBook);
router.post('/new',createBook);
router.patch('/update/:id',updatedBook);
router.delete('/delete/:id',deleteBook);

export default router;
