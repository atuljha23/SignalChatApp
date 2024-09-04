import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactsRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [process.env.ORIGIN, "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

mongoose
  .connect(databaseURL, {})
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((err) => console.log(err));
