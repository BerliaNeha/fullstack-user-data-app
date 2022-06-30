import { check } from "express-validator";

const registerValidator = () => {
  return [
    check("username")
      .trim()
      .escape()
      .isLength({ min: 6, max: 55 })
      .withMessage("Username must be between 6-15 characters in length")
      .custom((value) => {
        return value.toLowerCase().indexOf("Anonymous") === -1;
      })
      .withMessage("No Anonymous allowed"),

    check("password")
      .trim()
      .escape()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password not valid"),

    check("firstName").trim().escape(),

    check("lastName").trim().escape(),

    check("emailAddress")
    .normalizeEmail()
    .isEmail()
      .withMessage("Email should be in valid format"),
  ];
};

export default registerValidator;
