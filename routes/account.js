const express = require("express");
const fs = require("fs");
const hash = require("../utils/hash");

const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  res.render("account/index");
});

router.get("/login",(req,res)=>{
  if(req.session.user) return res.redirect("/account");

  res.render("account/login");
});

router.post("/login",(req,res)=>{
  if(req.session.user) return res.redirect("/account");

  if(!(
    req.body.username&&
    req.body.password
  )) return res.render("account/login",{ errorMessage: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(!(
    account.find(ac=>ac.name === req.body.username)&&
    account.find(ac=>ac.password === hash(req.body.password))
  )) return res.render("account/login",{ errorMessage: "ユーザー名、パスワードが違います" });

  req.session.user = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  fs.writeFileSync("./database/account.json",JSON.stringify(account),"utf8");

  res.redirect("/account");
});

router.get("/create",(req,res)=>{
  if(req.session.user) return res.redirect("/account");

  res.render("account/create");
});

router.post("/create",(req,res)=>{
  if(req.session.user) return res.redirect("/account");

  if(!(
    req.body.username&&
    req.body.password
  )) return res.render("account/create",{ errorMessage: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(account.find(ac=>ac.name === req.body.username)) return res.render("account/create",{ errorMessage: "このユーザー名は登録できません" });

  req.session.user = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  account.push(req.session.user);

  fs.writeFileSync("./database/account.json",JSON.stringify(account),"utf8");

  res.redirect("/account");
});

router.get("/edit",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  res.render("account/edit");
});

router.post("/edit",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(!(
    req.body.username&&
    req.body.oldPassword&&
    req.body.newPassword
  )) return res.render("account/edit",{ errorMessage: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(!account.find(ac=>ac.password === hash(req.body.oldPassword))) return res.render("account/edit",{ errorMessage: "パスワードが違います" });

  req.session.user = {
    name: req.body.username,
    password: hash(req.body.newPassword)
  };

  fs.writeFileSync("./database/account.json",JSON.stringify(account),"utf8");

  res.redirect("/account");
});

router.get("/logout",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  req.session.destroy();

  res.redirect("/account/login");
});

module.exports = router;