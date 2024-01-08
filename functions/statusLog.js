module.exports = async()=>{
  const cron = require("node-cron");
  require("dotenv").config();
  const fs = require("fs");
  const log = require("../utils/log");
  const status = require("../utils/status");

  cron.schedule("0 * * * *",()=>{
    const data = JSON.parse(fs.readFileSync("./database/status.json","utf8"));

    const { cpu, memory } = status();

    let logCount = data.length;
    while(logCount >= 168){
      data.shift();

      logCount--;
      if(logCount <= 167) break;
    }

    data.push({
      time: new Date().toLocaleString(),
      cpu: cpu,
      memory: memory
    });

    fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");

    log.info("ログを保存しました");
  });
}