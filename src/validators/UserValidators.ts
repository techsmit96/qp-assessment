import { body, query } from "express-validator";
import User from "../models/UserModel";

export class UserValidators {
  static signUp() {
    return [
      body("username", "Username is required")
        .isString()
        .custom((username, { req }) => {
          return User.findOne({ where: { username: username } }).then(
            (user) => {
              if (user) {
                throw new Error("User already exist");
              } else {
                return true;
              }
            }
          );
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password can be from 8-20 character only"),
      body("name", "Name is required").isString(),
      body("role_id", "Role Id is required").isNumeric(),
    ];
  }
  static login() {
    return [
      body("username", "Username is required")
        .isString()
        .custom((username, { req }) => {
          return User.findOne({ where: { username: username } }).then(
            (user) => {
              if (user) {
                req.user = user.dataValues;
                return true;
              } else {
                throw new Error("User does not exist");
              }
            }
          );
        }),
      body("password", "Password is required").isString(),
    ];
  }
}
