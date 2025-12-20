import {v2 as cloudinary} from 'cloudinary';
import fs from  'fs';


//  seeting up  cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  function to upload image to cloudinary
const uploadcloudinary=async  (localFilepath)=>{
    try{
        if(!localFilepath) return null;
        const response=await cloudinary.uploader.upload(localFilepath,{
            resource_type:'auto',

        })
        fs.unlinkSync(localFilepath); //  deleting  the local file after upload
        return {
            url:response.secure_url,
            public_id:response.public_id,
        };
    }
    catch(error){
    console.error('Error uploading to Cloudinary:', error);
    throw error;
}
} 


// exporting the uploadcloudinary function
export  {uploadcloudinary};