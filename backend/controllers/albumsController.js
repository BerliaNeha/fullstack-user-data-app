import Album from "../models/album.js";
import createError from "http-errors";

export const albumsPost = async (req, res, next) => {
    
    let existingAlbum;

   

    // ? Question 1: Does the album the user just tried to add already exist in the "albums" collection?
    try {
        existingAlbum = await Album.findOne(req.body);
    } catch {
        return next(createError(500, "Query didn't succeed. Please try again"));
    }

    // ? Question 2: Did we find an existing album with the same details in the "albums" collection?
    
    if (existingAlbum) {
        res.json({ id: existingAlbum._id });
  
    } else {
        let newAlbum;
        
        try {
            
            newAlbum = new Album(req.body);
           
            await newAlbum.save();
        } catch {
            return next(createError(500, "Album couldn't be created. Please try again"));
        }
        
        res.json({ id: newAlbum._id });
    }
}
