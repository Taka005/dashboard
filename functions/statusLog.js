module.exports = async()=>{
  const cron = require("node-cron");
  const os = require("os");
  require("dotenv").config();
  const db = require("../utils/db");
  const log = require("../utils/log");
  const cpu = require("../utils/cpu");

  cron.schedule("0 * * * *",async()=>{
    const cpuUsage = await cpu();
    const ramUsage = 100 - Math.floor((os.freemem()/os.totalmem())*100);

    let logCount = (await db("SELECT * FROM log;")).length;
    while(logCount >= 168){
      await db("DELETE FROM log ORDER BY time LIMIT 1;");
      logCount--;
      if(logCount <= 167) break;
    }

    await db(`INSERT INTO log (time, cpu, ram) VALUES(NOW(),"${cpuUsage}","${ramUsage}");`);

    log.info("ログを保存しました");
  });
}