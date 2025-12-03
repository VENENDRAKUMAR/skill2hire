// this is a common async handler to avoid try catch block in each controller



const asyncHandler=(requestHandler)=>{
return async (eror,req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch(next);  
}}
//  exporting the asyncHandler function
export  {asyncHandler};
