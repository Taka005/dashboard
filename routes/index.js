const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("index",{
    authenticated: req.session.authenticated
  });
});

module.exports = router;