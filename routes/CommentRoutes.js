import express from "express";
import { indexPostComments, store } from "../controllers/CommentController.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.post('/:postId',verifyToken,  store);
router.get('/:postId',  indexPostComments);

export default router;