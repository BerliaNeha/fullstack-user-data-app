import createError from "http-errors";
import User from "../models/user.js";


export const getUserData = async (req, res, next) => {
 
    const userId = req.params.id;

 
    let foundUser; 
    
    try {
       foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }

  
    if (foundUser) {
       

        await foundUser.populate("albums", {
          _id:true, albumTitle:true, band:true, albumYear:true
        });


        const userData = {
            firstName: foundUser.firstName,
            albums: foundUser.albums,
            isAdmin: foundUser.isAdmin
        }

        res.json(userData);
   
    } else {
        next(createError(404, "User could not be found"));
    }
}



export const updateAlbums = async (req, res, next) => {
    const albumId = req.body.id;    // id of the album the user just added
    const userId = req.params.id;   // id of the current logged-in user

    let foundUser;

 
    try {
        
        foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Query could not be completed. Please try again"))
    }

   
    const foundAlbum = foundUser.albums.find(existingId => existingId == albumId);
    if (!foundAlbum) {
        let updatedUser;

        try {
            
            updatedUser = await User.findByIdAndUpdate(userId, { $push: { albums: albumId}}, { new: true, runValidators: true });
        } catch {
            return next(createError(500, "User could not be updated. Please try again"));
        }

        await updatedUser.populate("albums", {
          _id:true,
          albumTitle:true,
          band:true,
          albumYear:true
        })

        res.json({ albums: updatedUser.albums });
    } else {
  
        next(createError(409, "The album already exists in your collection!"));
    }
}



export const deleteAlbums = async (req, res, next) => {
    const userId = req.params.id;

    
    let updatedUser;

    try {
        updatedUser = await User.findByIdAndUpdate(userId, { albums: [] }, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "User could not be updated. Please try again"));
    }
    
    res.json(updatedUser.albums);
}


export const deleteAlbum = async (req, res, next) => {
    const userId = req.params.id;
    const albumId = req.params.albumId;

    console.log("User id:", userId);
    console.log("Album id:", albumId);

    let updatedUser;

    try {
       
        updatedUser = await User.findByIdAndUpdate(userId, { $pull: { albums:albumId }}, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "User could not be updated. Please try again"));
    }

    await updatedUser.populate("albums", {
      _id:true,
      albumTitle:true,
      band:true,
      albumYear:true
    })

    res.json(updatedUser.albums);
}



export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndRemove(userId);
    } catch {
        return next(createError(500, "User could not be deleted. Please try again"));
    }

    res.json({ message: "Your account has been successfully deleted. Come back soon!" });
}

    