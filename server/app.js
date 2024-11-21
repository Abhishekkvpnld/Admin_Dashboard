import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Server running...🚀");
});

const PORT = process.env.PORT;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...🚀🚀`);
  });
});
