import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  frontend_url:
    process.env.NODE_ENV !== "production"
      ? process.env.FRONTEND_URL_DEV
      : process.env.FRONTEND_URL_PROD,
};
