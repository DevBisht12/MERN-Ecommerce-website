import jwt from 'jsonwebtoken';
const JWT_SECRET= "fjlajfalkjFLAJFLAFLjflafla"
import { user } from '../DataBase/models/user.js';

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "UnauthorizedAUTH"
            })
        }
        const decodedToken= jwt.verify(token, JWT_SECRET);
        req.User = await user.findById(decodedToken._id)
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.User.role)) {
            return res.status(401).json({
                success: false,
                message: `Role ${req.User.role} is not authorized to access`
            });
        }
        next();
    }
}
