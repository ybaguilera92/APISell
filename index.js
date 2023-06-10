import express from "express";
import dotenv from "dotenv";

//import app from "./app.js"

import cors from "cors";
import morgan from "morgan";
import historyApiFallback from "connect-history-api-fallback";

import connect from "./config/db.js";
import corsOptions from "./config/corsOptions.js";

import userRouter from "./routers/userRoutes.js";
import productRouter from "./routers/productRoutes.js";
import sellRouter from "./routers/sellRoutes.js";

import allSeeders from "./models/seeds/allSeeds.js";



const app = express();
app.use(express.json());
app.use(express.json({
    limit: "4mb"
}));
app.use(express.urlencoded({
    extended: true
}));


app.use(morgan('dev'));


dotenv.config();

connect();
app.listen(process.env.PORT || 4000, () => console.log("Server running on port 4000"));

allSeeders();

app.use("/API/USER", userRouter);
app.use("/API/PRODUCT", productRouter);
app.use("/API/SELL", sellRouter);

