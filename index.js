const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const favicon = require("serve-favicon");
const log = require("./utils/log");
const config = require("./config.json");
require("dotenv");

const app = express();

app.set("view engine","ejs");
app.use(favicon("./public/assets/img/favicon.ico"));
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: true,
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

  if(!req.session.user) return res.redirect("account/login");

  next();
});

app.use("/",require("./routes/index"));
app.use("/account",require("./routes/account"));

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