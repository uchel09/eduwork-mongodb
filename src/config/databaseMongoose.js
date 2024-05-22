import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://russel:1w551474@localhost:27017?authSource=admin"
    );

    console.log("Connected successfully to mongoose server");
  } catch (err) {
    console.log(`Error connecting to mongoose: ${err}`);
  }
};

export default connectDB;
