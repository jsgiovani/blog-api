import mongoose from "mongoose";
import { hash } from 'bcrypt'

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

}, {
    timestamps:true
});

//has user password
userSchema.pre('save', async function(next) {
    const hashedPassword =  await hash(this.password, 10)
    this.password = hashedPassword;
    next();
})


const User = mongoose.model('User', userSchema);


export default User;