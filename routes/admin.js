const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) return res.redirect("/account/login");

  if(req.session.user.name !== "admin") return res.render("admin/error");

  res.render("admin/index");
});

module.exports = router;