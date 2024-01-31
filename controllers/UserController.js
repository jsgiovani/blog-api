import User from "../models/User.js";
import { error } from "../utils/errorHandler.js";

const update = async ( req, res, next ) =>{
    
    if (req.user.id !== req.params.id) return next(error(401, 'Unauthorized')); 
    
    const options = {new:true};

    try {
        const findUser = await User.findOneAndUpdate(req.body.id,{$set:req.body},options);
       
        res.json({
            success:true,
            data:findUser,
            status:204
        });
        
    } catch (error) {
        next(error);
    }

    
};


export {update};