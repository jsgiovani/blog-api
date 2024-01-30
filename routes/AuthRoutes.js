import express from 'express';
import { google, login, logout, register } from '../controllers/AuthController.js';


const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/google', google);



export default router;