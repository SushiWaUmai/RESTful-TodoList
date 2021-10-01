import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const MONGO_URI = process.env.MONGO_URI + "";
export const SESSION_SECRET = process.env.SESSION_SECRET + "";
export const COOKIE_NAME = process.env.COOKIE_NAME + "";
export const PORT = process.env.PORT + "";
export const DATABASE_NAME = process.env.DATABASE_NAME + "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD + "";
export const EMAIL_USER = process.env.EMAIL_USER + "";
