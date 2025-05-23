import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { v2 as cloudinary } from "cloudinary";
import redis from "./redis";
import http from "http";
import { initSocketServer } from "./socketServer";
const server = http.createServer(app);

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api_key,
  api_secret: config.cloudinary.cloud_secret_key,
});

initSocketServer(server);

async function main() {
  try {
    await mongoose.connect(config.db_uri as string);

    server.listen(config.port, () => {
      console.log(`lms running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
