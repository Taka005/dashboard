const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  if(!req.session.user) res.redirect("account/login");

  res.render("index");
});

module.exports = router;