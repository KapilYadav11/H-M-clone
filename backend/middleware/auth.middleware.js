import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user.model.js';

export const authMiddleware = async(req, res, next)=>{
    try {
        let token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"token not found"
            })
        }

        let decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token or unauthorixed"
            })
        }

        let user = await UserModel.findById(decode.id);
        if(!user)
            return res.status(400).json({

               message:"user not found" 
            });

            req.user = user;
            next();
    
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token authorized!",
            error
        })
    }
}