const express = require("express");
const favicon = require("serve-favicon");
const log = require("./lib/log");
const config = require("./config.json");

const app = express();

app.set("views","./site");
app.set("view engine","ejs");
app.use(favicon("./public/favicon.ico"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

log.reset();

app.listen(config.port,()=>{
  log.info(`${config.port}番ポートで起動しました`);
});

app.use((req,res,next)=>{
  log.info(`${req.ip} - [${req.method}] ${req.originalUrl}`)

  next();
});

app.use("/",require("./routes/index"));

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