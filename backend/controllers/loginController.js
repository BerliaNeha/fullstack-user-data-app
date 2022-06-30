//import { db } from "../index.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const loginPost = async (req, res, next) => {

  const { username, password } = req.body;

 

  let found;
  try {
    found = await User.findOne({ username: username });
  } catch {
    
    return next(
      new createError[500]("Database query failed. Please try again")
    );
  }

  if (found) {
    let isValidPassword;
    try {
      isValidPassword = await bcrypt.compare(password, found.password);
    } catch {
      return next(createError(500, "Logging in failed. PLease try again"));
    }

    if (!isValidPassword) {
      return next(createError(401, "Incorrect password. Please try again"));
    }

    let newToken;
    try {
      newToken = jwt.sign({ id:found.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("dataCookie", newToken, {httpOnly:true, sameSite: "Strict"})


    } catch {
      return next(
        createError(500, "Signup could not be completed. Please try again")
      );
    }


    res.json({id:found._id, token:newToken});
    
  } else {
    return next(
      new createError[404](
        "No user exists with this username. Please try again"
      )
    );
  }
};
