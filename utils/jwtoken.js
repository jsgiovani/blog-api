import jwt from 'jsonwebtoken';

const generateJWT = ({id,isAdmin})=>{
    return jwt.sign({id, isAdmin}, process.env.JWT,{
        expiresIn:"30d"
    });
};

export default generateJWT;