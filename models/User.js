import mongoose from "mongoose";
import { compare, hash } from 'bcrypt'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },

    username:{
        type: String,
        required:true,
        unique:true,
    },

    password:{
        type: String,
        required:true,
    },

    photo:{
        type:String,
        default: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
    },


}, {
    timestamps:true
});

//has user password
userSchema.pre('save', async function(next) {
    const hashedPassword =  await hash(this.password, 10)
    this.password = hashedPassword;
    next();
});


userSchema.method('isValidPassword', async function(password){
    const isValid = await compare(password, this.password)
    return isValid;
});


const User = mongoose.model('User', userSchema);


export default User;