import express, { NextFunction, Request, Response } from "express";
import {router as routes} from "./routes";
import "dotenv/config";
import mongoose from "mongoose";


const app = express();
app.set('PORT', process.env.PORT || 3000);
let db = null;
let mongodbUrl = process.env.MONGODB_URL;

if(mongodbUrl) {
    db = mongoose.connect(mongodbUrl, {
        dbName: "rn-test",
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error("Cannot connect to MongoDB");
        console.log(err)
    });
} else {
    console.error("MONGODB_URL is not defined in .env file");
}

app.use(express.json());
app.use("/api", routes)

app.use((err: any,req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

app.listen(app.get("PORT"), () => console.log("Server started on port ", app.get('PORT')));