import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import { Low, JSONFile } from "lowdb";
import morgan from "morgan";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import albumsRouter from "./routes/albums.js";
import adminRouter from "./routes/admin.js";

const app = express();
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mj4qp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.on("open", ()=> console.log("Database connection established"));
mongoose.connection.on("error", ()=> console.error);


const adapter = new JSONFile("./data/db.json");
export const db = new Low(adapter);
//await db.read();


app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(cookieParser());

app.use(express.json());

app.use(morgan("tiny"));

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/albums", albumsRouter);

app.use("/admin", adminRouter);


app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})