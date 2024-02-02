import express  from "express";
import { store } from "../controllers/PostController.js";
import verifyToken from "../middleware/verifyToken.js";



const router = express.Router();

router.post('/', verifyToken, store);


export default router;