const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('dotenv').config();
require("./config/database");

const v1AuthRouter = require('./api/v1/auth');
const v1UsersRouter = require('./api/v1/users');
const v1WhatsappRouter = require('./api/v1/whatsapp');

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/users", v1UsersRouter);
app.use("/api/v1/whatsapp", v1WhatsappRouter);

server.listen(PORT, () => {
    console.log("App Running on Port: " + PORT);
});