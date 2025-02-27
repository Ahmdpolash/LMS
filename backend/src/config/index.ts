import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  db_uri: process.env.DATABASE_URI,
  port: process.env.SERVER_PORT,
  origin: process.env.ORIGIN,
  node_env: process.env.NODE_ENV,
  redis_url: process.env.REDIS_URL,
};
