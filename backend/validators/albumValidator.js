import {check} from "express-validator"

const albumValidator=()=>{
    return[
        check("albumTitle")
        .trim().escape().isLength({min:2})
        .withMessage("Album title should be atleast 2 characters long"), 

        check("band")
        .trim().escape().isLength({min:2})
        .withMessage("Band should at least have 2 characters"),

        check("albumYear")
        .isNumeric()
        // .isLength({min:1900, max:2022})
        .withMessage("Invalid entry")
        .custom((value)=>{
            const currentYear = new Date().getFullYear(); 
            return value>=1900 && value<=currentYear
            })
        .withMessage(`Album year should be between year 1900 and ${new Date().getFullYear()}`)

    ]
}

export default albumValidator;