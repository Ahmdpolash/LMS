import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  db_uri: process.env.DATABASE_URI,
  port: process.env.SERVER_PORT,
  origin: process.env.ORIGIN,
  node_env: process.env.NODE_ENV,
  redis_url: process.env.REDIS_URL,
  jwt: {
    jwt_access_token: process.env.JWT_ACCESS_SECRET,
    jwt_access_token_expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
    jwt_refresh_token: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_token_expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
    activation_token: process.env.ACTIVATION_SECRET,
  },
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
    hostName: process.env.HOST,
    port: process.env.PORT
  },
};
