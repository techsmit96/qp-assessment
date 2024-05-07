import { validationResult } from "express-validator";
import * as Jwt from "jsonwebtoken";

export class GlobalMiddleWare {
  static checkError(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      next(new Error(error.array()[0].msg));
    } else {
      next();
    }
  }
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
    try {
      Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          next(err);
        } else if (!decoded) {
          req.errorStatus = 401;
          next(new Error("User not Authorised"));
        } else {
          req.user = decoded;
          next();
        }
      });
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }
  static async adminAuth(req, res, next) {
    try {
      let user = req.user;
      console.log(user);
      if (user.role_id == 2) {
        next();
      } else {
        req.errorStatus = 401;
        next(new Error("User not Authorised"));
      }
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }
  static async userAuth(req, res, next) {
    try {
      let user = req.user;
      console.log(user);
      if (user.role_id == 1) {
        next();
      } else {
        req.errorStatus = 401;
        next(new Error("User not Authorised"));
      }
    } catch (e) {
      req.errorStatus = 401;
      next(e);
    }
  }
}
