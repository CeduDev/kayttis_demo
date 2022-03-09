const express = require('express');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const cors = require("cors")
const helmet = require("helmet")

const { pool } = require("./database/database.js")
const authRouter = require("./routers/authRouter.js")
const errorMiddlewares = require("./middleware/errorHandler.js")

const app = express()

app.disable("x-powered-by")
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
)
app.use(express.json())
app.use(session({
    store: new pgSession({
        pool : pool,
      }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

app.use(express.static(__dirname + "../frontend/build/index.html"))

app.use("/api/auth", authRouter.router)

app.use("/api/*", function (req, res) {
    res.status(404).send("Error 404: Unknown api endpoint")
})
app.use("/*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html")
})

app.use(errorMiddlewares.errorHandlerMiddleware)

module.exports = app