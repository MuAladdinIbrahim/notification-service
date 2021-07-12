import express from "express";
import router from "./modules/RawNotification/http/router"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export = app;
