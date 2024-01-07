const express = require("express");
const fs = require("fs");
const hash = require("../utils/hash");

const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) res.redirect("account/login");

  res.render("account/index");
});

router.get("/login",(req,res)=>{
  if(req.session.user) return res.redirect("account");

  res.render("account/login");
});

router.post("/login",(req,res)=>{
  if(
    req.body.username&&
    req.body.password
  ) return res.render("account/login",{ message: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(!(
    account.find(ac=>ac.name === req.body.username)&&
    account.find(ac=>ac.password === hash(req.body.password))
  )) return res.render("account/login",{ message: "ユーザー名、パスワードが違います" });

  res.session.user = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");

  res.redirect("account");
});

router.get("/create",(req,res)=>{
  if(req.session.user) return res.redirect("account");

  res.render("account/create");
});

router.post("/create",(req,res)=>{
  if(
    req.body.username&&
    req.body.password
  ) return res.render("account/create",{ message: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(account.find(ac=>ac.name === req.body.username)) return res.render("account/create",{ message: "このユーザー名は登録できません" });

  const data = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  account.push(data);
  res.session.user = data;

  fs.writeFileSync("./database/status.json",JSON.stringify(account),"utf8");

  res.redirect("account");
});

router.get("/logout",(req,res)=>{
  if(!req.session.user) res.redirect("account/login");

  req.session.destroy();
  res.redirect("account/login");
});

module.exports = router;