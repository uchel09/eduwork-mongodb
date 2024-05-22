// import { ZodError } from "zod";
import { ResponseError } from "./responseError.js";
import { MongoError } from "mongodb";

export const errorMiddleware = async (error, req, res, next) => {

  console.error(error.stack)
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else if (error instanceof MongoError) {
    res.status(500).json({
      errors: `Internal server error: ${error}`,
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(400).json({ errors: "Json web token is invalid, try again" });
  } else if (error.name === "TokenExpiredError") {
    res.status(400).json({ errors: "Token expired, try again" });
  } else {
    if (error.name === "BSONError") {
      res.status(404).json({
        errors: `not found ${error.name}`,
      });
    } else {
      res.status(500).json({
        errors: `Internal server error ${error.name}`,
      });
    }
  }
};
