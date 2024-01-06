const express = require("express");
const router = express.Router();

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

    res.json();
});

module.exports = router;