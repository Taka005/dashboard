const express = require("express");
const session = require("express-session");
const favicon = require("serve-favicon");
const helmet = require("helmet")
const log = require("./utils/log");
const config = require("./config.json");
require("dotenv").config();

require("./functions/statusLog")();

const app = express();

app.set("view engine","ejs");
app.use(favicon("./public/assets/img/favicon.ico"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 86400000
  }
}));

log.reset();

app.listen(config.port,()=>{
  log.info(`${config.port}番ポートで起動しました`);
});

app.use((req,res,next)=>{
  log.info(`${req.ip} - [${req.method}] ${req.originalUrl}`);

  res.locals.session = req.session;
  res.locals.config = config;
  res.locals.errorMessage = null;
  res.locals.successMessage = null;

  next();
});

app.use("/",require("./routes/index"));
app.use("/account",require("./routes/account"));
app.use("/admin",require("./routes/admin"));
app.use("/api",require("./routes/api"));

app.use((req,res)=>{
  res.status(400);
  res.render("error",{
    error:{
      "message": "404 NOT FOUND"
    }
  });
});

app.use((err,req,res)=>{
  res.status(500);
  res.render("error",{
    error:{
      "message": err.message,
      "stack": err.stack
    }
  });
});