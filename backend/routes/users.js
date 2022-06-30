import express from "express";
import { getUserData, updateAlbums, deleteAlbums, deleteAlbum, deleteUser} from "../controllers/usersController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js"
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

router.use(authorizeUser)

router.get("/:id", getUserData);   
router.patch("/:id/albums",requiredValues(["id"]),checkValidation, updateAlbums) // PATCH


router.delete("/:id/albums", deleteAlbums);   

router.delete("/:id/albums/:albumId", deleteAlbum);  

router.delete("/:id", deleteUser)

export default router;