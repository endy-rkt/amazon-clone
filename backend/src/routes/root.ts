import express from 'express';
import path from 'path';

const router = express.Router();

router.get(['/','/api'],(req,res)=>{
	res.sendFile(path.join(__dirname,'..','views','index.html'));
});

export default router;