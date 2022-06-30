import express from "express";
import { loginPost } from "../controllers/loginController.js";

import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js"
// import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();
// router.use(authorizeUser)

router.post("/", requiredValues(["username", "password"]),checkValidation, loginPost)    

export default router;