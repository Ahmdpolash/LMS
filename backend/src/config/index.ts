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
    jwt_access_token_expiresIn: "1d",
    jwt_refresh_token: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_token_expiresIn: "30d",
    activation_token: process.env.ACTIVATION_SECRET,
    redis_session_expiresIn_seconds: 604800,
  },
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
    hostName: process.env.HOST,
    port: process.env.PORT,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },

  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,

    cloud_api_key: process.env.CLOUD_API_KEY,

    cloud_secret_key: process.env.CLOUD_SECRET_KEY,
  },
};
