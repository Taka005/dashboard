const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/status",(req,res)=>{
  if(!req.session.user) res.json({
    error: "ログインしていません"
  });

  res.json();
});

router.get("/statusLog",(req,res)=>{
  if(!req.session.user) res.json({
    error: "ログインしていません"
  });

  res.json(JSON.parse(fs.readFileSync("./database/status.json","utf8")));
});

module.exports = router;