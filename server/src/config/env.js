import { config } from "dotenv";

config();

export const NODE_ENV = process.env.NODE_ENV;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
export const JWT_KEY = process.env.JWT_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const DATABASE_URL =
  process.env.NODE_ENV !== "test"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_TEST;
export const PORT = process.env.PORT;
