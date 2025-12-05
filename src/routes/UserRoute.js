import {Router} from 'express';
import { registerUser,loginUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyjwt} from '../middlewares/auth.middleware.js';


//  create a router instance
const router = Router();
//  define a simple route




router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

    router.route("/login").post(loginUser);
    router.route("/profile").get(verifyjwt,(req,res)=>{     
        res.status(200).json({message:"secured profile route",user:req.user});
    }
    );  
//  export the router

//  secured route example

export default router;