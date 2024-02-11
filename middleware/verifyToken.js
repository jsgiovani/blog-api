import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { error } from '../utils/errorHandler.js';
const verifyToken = async (req, res, next)=>{

    let token = req.headers.authorization;

    if (!token) {
        return next(error(401, 'Unauthorized'));
    }
 
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            
            token = req.headers.authorization.split(' ')[1];

            const decodedJWT = jwt.verify(token, process.env.JWT);

            const { id } = decodedJWT;

            const findUser = await User.findById(id);

            if (!findUser) {
                return next(error(404, 'User Not Found'));
            }

            req.user = findUser;

        } catch (error) {
            return next(error);
        }
    }

    next();
}

export default verifyToken;