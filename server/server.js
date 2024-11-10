import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import shoproutes from "./routes/Home.Routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri, {}); // Adding options for better compatibility

    // Once connected to MongoDB, start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Listen for connection events
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB 😁");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected 🥲");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongoose reconnected");
});

// Start database connection
connectDb();

app.use("/shops", shoproutes);
app.use("/users", userRoutes);
