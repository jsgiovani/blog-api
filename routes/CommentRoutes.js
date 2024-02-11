import express from "express";
import { store } from "../controllers/CommentController.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.post('/:postId',verifyToken,  store);

export default router;