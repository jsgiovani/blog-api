import User from "../models/User.js";
import { error as er } from "../utils/errorHandler.js";



const remove = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(er(401, 'Unauthorized'));
    
    
    try {
        const findUser = await User.findByIdAndDelete(req.params.id);

        if (!findUser) {
            return next(er(404, 'Not Found')); 
        }


        res.json({
            success:true,
            data:{},
            status:202
        });

    } catch (error) {
        next(error);
    }


}

const update = async ( req, res, next ) =>{

    if (req.user.id !== req.params.id) return next(er(401, 'Unauthorized')); 
    
    const options = {new:true};

    try {

   

        const findUser = await User.findOneAndUpdate(req.body.id,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            photo:req.body.photo
        }},options);
       
        const {password, __v, ...rest} = findUser._doc;

        res.json({
            success:true,
            data:rest,
            status:204
        });
        
    } catch (error) {

        if (error.code == 11000) {
            return next(er(401, 'Username not available')); 
        }

        next(error);
    }
    
};


const index = async( req, res, next) => {

    if (!req.user.isAdmin) {
        return next(er(401, 'Unauthorized, You are not allowed to get this information'))
    };


    try {


        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const order = req.query.order ==='asc' ? 1:-1 || 1;

        const users = await User.find().sort({createdAt:order}).skip(startIndex).limit(limit);


        const tempUsers = users.map(user => {
            const { password, __v, ...rest } = user._doc;
            return rest;
        });


        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        );


        const lastMonthUsers = await User.countDocuments({createdAt:{$gte:oneMonthAgo}});


        res.json({
            success:true,
            data:{
                users,
                totalUsers,
                lastMonthUsers
            },
            status:200
        });


    } catch (error) {
        next(error);
    }

}


export { index, update, remove };