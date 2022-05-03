const cors = require("cors")
const express = require("express")
const app = express()
const session = require("express-session")
app.use(express.json())
app.use(cors({credentials: true, origin: true}))
const mongoose = require("mongoose")
const mainRouter = require("./router/MainRouter")
require('dotenv').config()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))
app.use('/', mainRouter)
mongoose.connect(process.env.MONGO_KEY).then(() => {
    console.log("database connection ok")
}).catch(e => {
    console.log(e)
    console.log("connection failed")
})

app.listen(4000)
