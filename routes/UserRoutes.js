import express from 'express';
import { update } from '../controllers/UserController.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.put('/:id', verifyToken, update);


export default router;