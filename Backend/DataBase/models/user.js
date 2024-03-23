import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        maxLength:[30, 'Name must be less than 30 characters'],
        minLength:[3, 'Name must be more than 3 characters']
    },
    email:{
        type:String,
        unique:[true, 'This email is already registered with us'],
        required:[true, 'Please enter your email'],
        validate:[validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minLength:[6, 'Password must be at least 6 characters long'],
        select:false
    },
    role: {
        type: String,
        default: "user",
    }
})



export const user = mongoose.model('User', userSchema);