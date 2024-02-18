import express from "express";
import { index, indexPostComments, likeOrUnlike, remove, store, update } from "../controllers/CommentController.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.get('/',  verifyToken, index);
router.get('/:postId',  indexPostComments);
router.post('/:postId',verifyToken,  store);
router.post('/likes/:commentId', verifyToken,  likeOrUnlike);
router.delete('/:commentId/:userId',  verifyToken, remove);
router.put('/:commentId/:userId',  verifyToken, update);

export default router;