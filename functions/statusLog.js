module.exports = async()=>{
  const cron = require("node-cron");
  const os = require("os");
  require("dotenv").config();
  const fs = require("fs");
  const log = require("../utils/log");
  const cpu = require("../utils/cpu");

  cron.schedule("0 * * * *",async()=>{
    const data = JSON.parse(fs.readFileSync("./database/status.json","utf8"));

    const cpuUsage = await cpu();
    const ramUsage = 100 - Math.floor((os.freemem()/os.totalmem())*100);

    let logCount = data.length;
    while(logCount >= 168){
      data.shift();

      logCount--;
      if(logCount <= 167) break;
    }

    data.push({
      time: new Date(),
      cpu: cpuUsage,
      memory: ramUsage
    });

    fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");

    log.info("ログを保存しました");
  });
}