import express from "express";
import { albumsPost } from "../controllers/albumsController.js";
import albumValidator from "../validators/albumValidator.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

//Stop anything which fails authorization even before its goes to router.post

router.use(authorizeUser)


router.post("/", requiredValues(["albumTitle", "band", "albumYear"]),albumValidator(), checkValidation, albumsPost);    // POST /albums

export default router;