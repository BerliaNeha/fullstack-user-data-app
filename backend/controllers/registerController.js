//import { db } from "../index.js"
//import { v4 as uuid } from "uuid";

import User from "../models/user.js";
import createError from "http-errors";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerPost = async (req, res, next) => {
 
  const { username, password, firstName, lastName, emailAddress } = req.body;

  let foundUsername;
  try {
    foundUsername = await User.findOne({ username: username });
  } catch {
    return next(createError(500, "Database could not be queried"));
  }

  if (foundUsername) {
    return next(
      createError(
        409,
        "username has already been taken. Please try a different username"
      )
    );
  }

  let foundEmail;
  try {
    foundEmail = await User.findOne({ emailAddress: emailAddress });
  } catch {
    return next(createError(500, "Database could not be queried"));
  }

  if (foundEmail) {
    return next(createError(409, "Email already taken. Please try again"));
  }

 
  const newUser = new User({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    isAdmin: false,
    albums: [],
  });

 

  try {
    await newUser.save();
  } catch {
    return next(new createError[500]("User could not be registered"));
  }




let newToken;
try{
  newToken = jwt.sign({id:newUser.id}, process.env.SECRET_KEY, {expiresIn: "1h"});
  res.cookie("dataCookie", newToken, {httpOnly:true, sameSite: "Strict"});

}catch{
  return next(createError(500, "Signup could not be completed. Please try again"))

}

// console.log("Token", token)


  // Send a response to the client containing the new user object in a JSON format
  res.status(201).json({id: newUser._id, token: newToken});


};

