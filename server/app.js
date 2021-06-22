import {loadConfig} from "../lib/config";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import * as db from "../database/mongo";
import {createRoutes} from "./router";

function createServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "..", "dist")));
    app.use(express.static("public"));
    loadConfig();
    db.setUpConnection();

    app.use(createRoutes());

    const server = app.listen(process.env.PORT, () => {
        console.log(`server works on port: ${process.env.PORT}`)
    });
}

createServer();