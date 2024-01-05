const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("account/index");
});

router.get("/login",(req,res)=>{
  res.render("account/login");
});

router.get("/create",(req,res)=>{
  res.render("account/create");
});

router.get("/logout",(req,res)=>{
  res.render("account/create");
});

module.exports = router;