import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./connection/DBconnection";
import cors from 'cors';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());


// setup cors

const corsOptions = {
  origin:"*", // allow all origins
  optionsSuccessStatus: 200 // 

}

app.use(cors(corsOptions));

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// db connection
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
