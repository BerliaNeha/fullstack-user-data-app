import createError from "http-errors";
import {check} from "express-validator"


const requiredValues=(props)=>{
 

    let checks =[];

    props.forEach(field => {
        checks.push(
            check(field)
            .notEmpty()
            .withMessage(`${field} is required`),
        )
        
    });
    return checks;


    
}

export default requiredValues;



