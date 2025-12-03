// this controller handles user-related operations
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from  "jsonwebtoken";
import mongoose from 'mongoose';
import { ApiResponse} from '../utils/ApiResponse.js';



//  creating access token using jwt 
const generateAccessAndRefreshToken = async (userId)=>{
    //  to  do  
    //  first finding user with id 
    //  creating token and payload
    // refresh token  genbneration 

    
    try{
const user=await User.findById(userId);
const accessToken=user.generateAccessToken();
const refreshToken=user.generateRefreshToken();
user.refreshToken=refreshToken;
await user.save({validateBeforeSave:false});
return {accessToken,refreshToken};

    }
    catch(error){
        throw new ApiError(500,"Internal Server Error");
    }
}


///  lets make  register controoler 
     