const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  const data = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  res.render("admin/index",{
    userCount: data.length
  });
});

router.get("/user",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  const data = JSON.parse(fs.readFileSync("./database/account.json","utf8"));

  res.render("admin/user",{
    users: data.map(ac=>ac.name)
  });
});

module.exports = router;