import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import productRouter from "./routers/productRoutes.js";
import sellRouter from "./routers/sellRoutes.js";
import userRouter from "./routers/userRoutes.js";


const app = express();
dotenv.config();
app.use(express.json());
connect();

app.use("/API/PRODUCT", productRouter);
app.use("/API/SELL/", sellRouter);
app.use("/API/USER", userRouter);


export default app;

