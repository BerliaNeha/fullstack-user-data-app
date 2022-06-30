import express from "express";
import { registerPost } from "../controllers/registerController.js";
import checkValidation from "../validators/checkValidation.js"
import registerValidator from "../validators/registerValidator.js";
import requiredValues from "../validators/requiredValues.js"


const router = express.Router();


router.post("/", requiredValues(["username", "password","emailAddress"]), registerValidator(), checkValidation, registerPost);    

export default router;