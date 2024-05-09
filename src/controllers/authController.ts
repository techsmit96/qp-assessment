import { Request, Response, NextFunction } from "express";
import { Utils } from "../utils/utils";
import * as Jwt from "jsonwebtoken";
import User from "../models/UserModel";

declare module "express" {
  export interface Request {
    user: any;
  }
}

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password = req.body.password;
  try {
    const hash = await Utils.encryptPassword(password);
    const data = {
      role_id: req.body.role_id,
      name: req.body.name,
      password: hash,
      username: req.body.username,
    };
    let user = await User.create(data);
    res.status(200).json({
      messge: "User Created.",
      user,
    });
  } catch (e) {
    next(e);
  }
};
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password = req.body.password;
  const user = req.user;
  try {
    await Utils.comparePassword({
      plainPassword: password,
      encryptedPassword: user.password,
    });
    const token = Jwt.sign(
      { username: user.username, id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      messge: "User logged in.",
      token,
      user,
    });
  } catch (e) {
    // res.status(401).json({
    //   message: "Invalid user credentials.",
    // });
    next(e);
  }
};
export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(0),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (e) {
    next(e);
  }
};
