const fs = require("fs");
const hash = require("../utils/hash");

class Account{
  constructor(){
    this.path = "./database/account.json";
    this.data = null;
  }

  load(){
    this.data = JSON.parse(fs.readFileSync(this.path,"utf8"));
  }

  save(){
    fs.writeFileSync(this.path,JSON.stringify(this.data),"utf8");
  }

  checkName(name){
    return this.data.find(ac=>ac.name === name);
  }

  checkPassword(password){
    return this.data.find(ac=>ac.password === hash(password));
  }

  add(user){
    this.data.push(user);

    return user;
  }

  remove(name){
    this.data = this.data.filter(ac=>ac.name !== name);
  }

  edit(name,user){
    const index = this.data.map(ac=>ac.name).indexOf(name);
    this.data[index] = user;

    return user;
  }

  isAdmin(name){
    return name === "admin";
  }

  filter(str,length){
    return str.length >= length
  }
}

module.exports = Account;