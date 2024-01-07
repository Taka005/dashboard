module.exports = (text)=>{
  const crypto = require("crypto");

  const hash = crypto.createHash("sha256");
  hash.update(text);

  return hash.digest("hex");
}