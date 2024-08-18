import express from "express";
import conn from "../src/schema/index.js";

const app = express();

conn();

app.listen(3000, (req, res) => {
    console.log("listen at :  3000");
})