import User from "../models/User.js";
import { error } from "../utils/errorHandler.js";
import generateJWT from "../utils/jwtoken.js";
import { v4 as uuidv4 } from 'uuid';

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


const login = async (req, res, next) =>{

    const { email, password:ps } = req.body;

    if (!email || !ps) {
        return next(error(400, 'All fields are required'));
    }

    //verify if user exists
    const findUser = await User.findOne({email});

    if (!findUser) {
        return next(error(404, 'User Not Found'));
    }


    try {
        //validate if user password is correct
        const isValidPassword = await findUser.isValidPassword(ps);
    
        if (!isValidPassword) {
            return next(error(401, 'Wrong Credentials'));
        }

        const token = generateJWT(findUser._id);

        //remove password and __v from object
        const { password, __v,...rest} = findUser._doc;


        //crete a new object with rest and adding token to object
        const user = {...rest, token};


        res.json({
            success:true,
            data:user,
            status:200
        });
        
    } catch (error) {
        next(error);
    }






};



const google = async(req,res, next) =>{

    const { email, username } = req.body;


    try {

        //verify if user exists
        const findUser = await User.findOne({email});

        
        //if user is found return with token
        if (findUser) {
            const token = generateJWT(findUser);
            const {password, __v, ...rest} = findUser._doc;
            const user = {...rest, token};

            return  res.json({
                success:true,
                data:user,
                status:200
            });

        };

        
        //generate random passowrd
        const randomPassword = `${Date.now()}${Math.random().toString(36)}`;

        const randomString = uuidv4().split('-')[0];
        const uniqUsername = `${username.split(" ")[0].toLowerCase()}-${randomString}`;


        const newUser = new User({...req.body, password:randomPassword, username:uniqUsername});

        const request = await newUser.save(); //save user

        //remove password and __v atribute from user object
        const {password, __v, ...rest} = request._doc;


        //add atribute token to created user
        const token = generateJWT(request);
        const user = {...rest, token};

        //send response
        res.json({
            success:true,
            data:user,
            status:201
        });


        
    } catch (error) {
        return next(error);
    }



    
}




const logout = (req, res, next) =>{
    res.send('Hola soy logout');
};



export { login, register, logout, google };