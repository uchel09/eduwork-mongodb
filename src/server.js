import express from "express";
import dotenv from "dotenv";
import allRoutes from "./routes/index.js";
import connectDB from "./config/databaseMongoose.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB()
const app = express();

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
// app.use("publid", express.static(path.join(__dirname, "uploads")));

allRoutes(app);

app.use(errorMiddleware);

app.listen(8000,  () => {
  console.log(`Server is running on port`);
});
