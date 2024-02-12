import express from "express";
import { indexPostComments, likeOrUnlike, store } from "../controllers/CommentController.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.post('/:postId',verifyToken,  store);
router.get('/:postId',  indexPostComments);
router.post('/likes/:commentId', verifyToken,  likeOrUnlike);

export default router;