import express from 'express';
import { index, remove, show, update } from '../controllers/UserController.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.get('/', verifyToken, index);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);
router.get('/:id', show);



export default router;