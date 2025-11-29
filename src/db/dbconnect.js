import mongoose from "mongoose";
import { DB_NAME } from "../constant";
const connectDB=async()=>{
    //  connecting db is will be a async process
    try{
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
              console.log(`\n MongoDB connected ✅ !! DB HOST: ${connectionInstance.connection.host}`);
              //  logging the db uri  and resplonse

    }
    catch(error){
        console.log("db connection failed >>❌")
    }
}