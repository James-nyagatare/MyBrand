import { config } from "dotenv";

config();

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
export const JWT_KEY = process.env.JWT_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
