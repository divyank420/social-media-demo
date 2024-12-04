import dotenv from "dotenv";

dotenv.config();
export const jwt_secrat = process.env.JWT_SECRET;
export const post = process.env.PORT;
