const express = require("express");
const fs = require("fs");
const hash = require("../utils/hash");

const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) res.redirect("login");

  res.render("account/index");
});

router.get("/login",(req,res)=>{
  if(req.session.user) return res.redirect("/");

  res.render("account/login",{ message: null });
});

router.post("/login",(req,res)=>{
  if(req.session.user) return res.redirect("/");

  if(!(
    req.body.username&&
    req.body.password
  )) return res.render("account/login",{ message: "不正な操作です" }); 

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(!(
    account.find(ac=>ac.name === req.body.username)&&
    account.find(ac=>ac.password === hash(req.body.password))
  )) return res.render("account/login",{ message: "ユーザー名、パスワードが違います" });

  req.session.user = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  fs.writeFileSync("./database/account.json",JSON.stringify(account),"utf8");

  res.redirect("/");
});

router.get("/create",(req,res)=>{
  if(req.session.user) return res.redirect("/");

  res.render("account/create",{ message: null });
});

router.post("/create",(req,res)=>{
  if(req.session.user) return res.redirect("/");

  if(!(
    req.body.username&&
    req.body.password
  )) return res.render("account/create",{ message: "不正な操作です" });

  const account = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  if(account.find(ac=>ac.name === req.body.username)) return res.render("account/create",{ message: "このユーザー名は登録できません" });

  const data = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  account.push(data);
  req.session.user = data;

  fs.writeFileSync("./database/account.json",JSON.stringify(account),"utf8");

  res.redirect("/");
});

router.get("/logout",(req,res)=>{
  if(!req.session.user) res.redirect("login");

  req.session.destroy();
  res.redirect("login");
});

module.exports = router;