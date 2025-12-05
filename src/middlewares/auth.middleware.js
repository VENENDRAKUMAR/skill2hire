// //  this file is  a middleware for authentication in an Express.js application
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.model.js';

export const verifyjwt = async (req, res, next) => {



try{
   
    const token=req.cookies.accessToken||req.headers.authorization?.replace("Bearer ","");

    //  console log token
    console.log("token",token);
    
    if(!token){
        throw new ApiError(401,"Unauthorized access ,token is missing");
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user=await User.findById(decodedToke?._id).select("-password -refeshToken");
    
    if(!user){
        throw new ApiError(401,"Unauthorized access ,user not found");
    }

    req.user=user;
    next();
}
catch(error){
    throw new ApiError(401,error?.message ||"Unauthorized access ,invalid token");
}};

