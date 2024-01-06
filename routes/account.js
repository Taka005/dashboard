const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) res.redirect("account/login");

  res.render("account/index");
});

router.get("/login",(req,res)=>{
  if(req.session.user) return res.redirect("account");

  res.render("account/login");
});

router.get("/create",(req,res)=>{
  res.render("account/create");
});

router.get("/logout",(req,res)=>{
  if( !req.session.user) res.redirect("account/login");

  req.session.destroy();
  res.redirect("account/login");
});

module.exports = router;