import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.db_uri as string);

    app.listen(config.port, () => {
      console.log(`lms running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
