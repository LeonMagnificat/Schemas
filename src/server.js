import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import productRouter from "./api/product/product.js";

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

server.use("/products", productRouter);

const mongoURL = process.env.MONGODB_URL;
console.log(`Mongo URL: ${mongoURL}`);

mongoose.connect(mongoURL);

mongoose.connection.on("connected", () => {
  console.log(`Connected to Mongo`);
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
    console.table(listEndpoints(server));
  });
});