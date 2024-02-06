import express  from "express";
import { index, remove, store } from "../controllers/PostController.js";
import verifyToken from "../middleware/verifyToken.js";



const router = express.Router();

router.post('/', verifyToken, store);
router.get('/', index);
router.delete('/:id/:userId', verifyToken,  remove);


export default router;