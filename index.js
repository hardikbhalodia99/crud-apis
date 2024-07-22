const serverless = require("serverless-http");
const express = require("express");
const app = express();
const V1Routes = require("./src/routes/v1/routes")


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/v1",V1Routes);


module.exports.handler = serverless(app);