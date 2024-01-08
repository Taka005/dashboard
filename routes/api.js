const express = require("express");
const fs = require("fs");
const status = require("../utils/status");

const router = express.Router();

router.get("/status",(req,res)=>{
  if(!req.session.user) return res.json({
    error: "ログインしていません"
  });

  res.json(status());
});

router.get("/statusLog",(req,res)=>{
  if(!req.session.user) return res.json({
    error: "ログインしていません"
  });

  res.json(JSON.parse(fs.readFileSync("./database/status.json","utf8")));
});

module.exports = router;