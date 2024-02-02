import mongoose from "mongoose";
import  bcrypt, { compare } from 'bcrypt'

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

    isAdmin:{
        type:Boolean,
        default:false
    }


}, {
    timestamps:true
});

//has user password
userSchema.pre('save', async function (next) {  
    
    if (!this.isModified("password")) {
        console.log('isModified');
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.pre('findOneAndUpdate', async function () {  
    if (this._update.$set.password) {
        this._update.$set.password = await bcrypt.hash(this._update.$set.password, 10)
    }
});



userSchema.method('isValidPassword', async function(password){
    const isValid = await compare(password, this.password)
    return isValid;
});


const User = mongoose.model('User', userSchema);


export default User;