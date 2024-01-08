const express = require("express");
const hash = require("../utils/hash");
const Account = require("../components/Accounts");

const account = new Account();

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

  account.load();

  if(!(
    account.checkName(req.body.username)&&
    account.checkPassword(req.body.password)
  )) return res.render("account/login",{ errorMessage: "ユーザー名、パスワードが違います" });

  req.session.user = {
    name: req.body.username,
    password: hash(req.body.password)
  };

  account.save();

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

  account.load();

  if(account.checkName(req.body.username)) return res.render("account/create",{ errorMessage: "このユーザー名は登録できません" });

   const data = account.add({
    name: req.body.username,
    password: hash(req.body.password)
  });

  req.session.user = data;

  account.save();

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

  if(
    account.isAdmin(req.session.user.name)&&
    req.session.user.name !== req.body.username
  ) return res.render("account/edit",{ errorMessage: "管理者は名前の変更ができません" });

  account.load();

  if(!account.checkPassword(req.body.oldPassword)) return res.render("account/edit",{ errorMessage: "パスワードが違います" });

  const data = account.edit(req.session.user.name,{
    name: req.body.username,
    password: hash(req.body.newPassword)
  });

  req.session.user = data;

  account.save();

  res.redirect("/account");
});

router.get("/logout",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  req.session.destroy();

  res.redirect("/account/login");
});

module.exports = router;