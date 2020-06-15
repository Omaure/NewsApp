const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require('chalk');

const UserRouter = require("./routes/user");
const LoginRouter = require("./routes/login");

const UserModel = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;


mongoose
    .connect("mongodb://localhost:27017/newsapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(chalk.green("Database Connection Established"));
    })
    .catch((err) => console.log(chalk.bgRed.white(err)));

app.use((req, res, next) => {
    //logger for all requests on server endpoints
    console.log(`${chalk.yellow(new Date())} ---- ${chalk.green(req.method)} ---- ${chalk.blue(req.url)} `);

    next();
});

app.use("/user", UserRouter);
app.use("/login", LoginRouter);


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Listen on ${PORT}`);
    } else {
        console.log(chalk.bgRed.white(err))
    }
});
