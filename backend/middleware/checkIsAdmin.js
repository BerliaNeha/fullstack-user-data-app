import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
  let token;

  try {
    // token = req.headers.authorization.split(" ")[1];
    token = req.cookies.dataCookie;

    if (!token) {
      throw new Error("User unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    let currentUser;

    try {
      currentUser = await User.findById(decodedToken.id);
    } catch {
      return next(
        createError(500, "Could not query the Database. please try again")
      );
    }

    // console.log("Decoded token", decodedToken);

    if (currentUser && currentUser.isAdmin) {
      next();
    } else {
      throw new Error("User unauthorized");
    }
  } catch {
    next(createError(403, "User could not be authorized. Please try again"));
  }
};

export default isAdmin;
