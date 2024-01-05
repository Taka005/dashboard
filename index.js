const express = require("express");
const log = require("./lib/log");
const config = require("./config.json");

const app = express();

app.set("views","./site");
app.set("view engine","ejs");

log.reset();

app.listen(config.port,()=>{
  log.info(`${config.port}番ポートで起動しました`);
});

app.use((req,res,next)=>{
  log.info(`${req.ip} - [${req.method}] ${req.originalUrl}`)

  next();
});

app.get("/",(req,res)=>{
  res.render("app");
});