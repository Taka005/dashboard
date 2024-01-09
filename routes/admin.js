const express = require("express");
const fs = require("fs");
const Account = require("../components/Accounts");

const account = new Account();
const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  account.load();

  res.render("admin/index",{
    userCount: account.data.length
  });
});

router.get("/user",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  account.load();

  res.render("admin/user",{
    users: account.data
  });
});

router.post("/user",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  if(!req.body.name) return res.render("admin/user",{ errorMessage: "不正な操作です" });

  if(!account.isAdmin(req.body.name)) return res.render("admin/user",{ errorMessage: "管理者は削除できません" });

  account.load();

  account.remove(req.body.name);

  res.render("admin/user",{ successMessage: `${req.body.name}を削除しました` });
});

module.exports = router;