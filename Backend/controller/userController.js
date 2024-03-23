import { user } from "../DataBase/models/user.js";
import {sendToken} from "../utils/setToken.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class UserController{
    static async registerUser(req,res){
        try {
            const {name,email,password,role} = req.body;
            if(!name ||!email ||!password ){
                return res.status(400).json({
                    success: false,
                    message: "Please fill all the fields"
                })
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const User= await user.create({name,email,password:hashPassword,role});

            const token = jwt.sign({_id: User._id, name, email, role}, process.env.JWT_SECRET, {expiresIn:'24h'});
            
            sendToken(User, 201, res, token)
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async loginUser(req,res){
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide email and password"
                })
            }
            const User = await user.findOne({email}).select('password name email role');
            if (!User) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }
            const comparedPassword = await bcrypt.compare(password, User.password);
            if (!comparedPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid password"
                })
            }
            const token = jwt.sign({_id: User._id, name: User.name, email: User.email}, process.env.JWT_SECRET, {expiresIn:'24h'});
            sendToken(User, 200, res, token);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async logOutUser(req,res){
        try {
            const {token}=req.cookies;
            if(!token){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
            res.clearCookie('token');
            res.status(200).json({
                success: true,
                message: "Successfully Logged Out"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async changePassword(req,res){
        try {
            const {oldPassword,newPassword} = req.body;
            const{token}=req.cookies;
            if(!token ||!oldPassword ||!newPassword){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
            const {_id}=jwt.verify(token,process.env.JWT_SECRET);
            const User= await user.findById(_id).select('password');
            const comparedPassword = await bcrypt.compare(oldPassword,User.password);
            if(!comparedPassword){
                return res.status(400).json({
                    success: false,
                    message: "Password is incorrect"
                })
            }
            const hashPassword = await bcrypt.hash(newPassword, 10);
            User.password = hashPassword;
            await User.save();
            res.status(200).json({
                success: true,
                message: "Password Changed Successfully"
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async getUserDetails(req,res){
        try {
            const {token}=req.cookies;
            if(!token){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized FROM CONTROLLER"
                })
            }
            const {_id}=jwt.verify(token, process.env.JWT_SECRET);
            const User= await user.findById(_id).select('_id name email role password');
            res.status(200).json({
                success: true,
                id:User._id,
                name: User.name,
                email: User.email,
                role: User.role,
                password: User.password
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    //Admin Controller
    static async getAllUsers(req,res){
        try {
            const Users= await user.find();
            res.status(200).json({
                success: true,
                Users
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async getUserById(req,res){
        try {
            const {id}=req.params;
            const User= await user.findById(id);
            if(!User){
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }
            res.status(200).json({
                success: true,
                User
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async updateUserDetails(req,res){
        try {
            const {id}=req.params;
            const{role}=req.body;
            const User= await user.findById(id);
            if(!role){
                return res.status(400).json({
                    success: false,
                    message: "Please select role"
                })
            }
            if(!User){
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }
            User.role=role;
            await User.save();
            res.status(200).json({
                success: true,
                message: "Successfully Updated"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static async deleteUser(req,res){
        try {
            const {id}=req.params;
            const User= await user.findById(id);
            if(!User){
                return res.status(400).json({
                    success: false,
                    message: `User does not exist  with id: ${id}`
                })
            }
            await User.deleteOne();
            res.status(200).json({
                success: true,
                message: "Successfully Deleted by Admin"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}

export default UserController;