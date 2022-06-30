import User from "../models/user.js";
import createError from "http-errors";

export const countUsers = async (req,res,next) =>{
    let numOfDocuments 
    
    try{
        numOfDocuments = await User.countDocuments({});
    } catch {
        return next (createError(500, "Database could not be queried. Please try again"))
    }

  

res.json({count:numOfDocuments})

}