import express  from "express";
import { index, store } from "../controllers/PostController.js";
import verifyToken from "../middleware/verifyToken.js";



const router = express.Router();

router.post('/', verifyToken, store);
router.get('/', index);


export default router;