import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB  = async () => {
  try {
    const connectionURL = `${process.env.MONOGDB_URI}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(connectionURL);
    console.log("Mongo DB Connection successfull !!");
    // console.log(connectionInstance.connection.host);
  } catch (error) {
    console.error("Mongo DB connection Error: " + error);
  }
};

export default connectDB;
