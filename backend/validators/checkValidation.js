import createError from "http-errors"
import { validationResult } from "express-validator"

const checkValidation=(req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const foundErrors = errors.array(); 
        let errorString ="";

        foundErrors.forEach((err, index)=>{
            index !== foundErrors.length -1 
            ? errorString += err.msg + "\n"
            : errorString += err.msg
        })
        return next(createError(401, errorString))
      }

      next()
}

export default checkValidation;