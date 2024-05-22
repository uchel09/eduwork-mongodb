import { MongoClient } from "mongodb";

const url = "mongodb://russel:1w551474@localhost:27017?authSource=admin";

const clent = new MongoClient(url);

const database = async () => {
  try {
    await clent.connect();
    console.log("koneksi mongodb berhasil");
  } catch (error) {
    console.log("error :", error);
  }
};

database();

export const db =clent.db("eduwork")
