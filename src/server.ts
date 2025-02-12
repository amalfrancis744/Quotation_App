import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/DBconnection";
import cors from "cors";
dotenv.config();
import { apiRouter } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// setup cors
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use("/api", apiRouter);

app.use(cors(corsOptions));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello welcome to backend ,WOW!");
});

// db connection
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
