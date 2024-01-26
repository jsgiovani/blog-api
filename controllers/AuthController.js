import User from "../models/User.js";
import { error } from "../utils/errorHandler.js";

//register new user
const register = async (req, res, next) =>{
    const { email, password, username} = req.body;

    if (!email || !password || !username) {
        return next(error(400, 'All fields are required'));
    }


    //verify if user is not registered before

    const findUser = await User.findOne({username}, {email});

    if (findUser) {
        return next(error(409, 'User has been registered before'));
    };


    try {
        
        const newUser = new User(req.body);
        const request = await newUser.save();
    
        res.json({
            success:true,
            data:request,
            status:201
        });

    } catch (error) {
        return next(error);
    }
};

const login = (req, res, next) =>{
    res.send('Hola soy login');
};




const logout = (req, res, next) =>{
    res.send('Hola soy logout');
};



export { login, register, logout };