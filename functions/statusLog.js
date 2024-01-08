module.exports = async()=>{
  const cron = require("node-cron");
  const os = require("os");
  require("dotenv").config();
  const fs = require("fs");
  const log = require("../utils/log");

  cron.schedule("0 * * * *",async()=>{
    const data = JSON.parse(fs.readFileSync("./database/status.json","utf8"));

    const cpuUsage = await (async()=>{
      const cpus = os.cpus();
      const totalIdle = cpus.reduce((acc,cpu)=>acc + cpu.times.idle,0);
      const totalTick = cpus.reduce((acc,cpu)=>{
        Object.values(cpu.times).forEach(time=>acc += time);
        return acc;
      },0);

      const idle = totalIdle / cpus.length;
      const total = totalTick / cpus.length;
      return Math.floor(100 - (100*idle) / total);
    })();

    const ramUsage = 100 - Math.floor((os.freemem()/os.totalmem())*100);

    let logCount = data.length;
    while(logCount >= 168){
      data.shift();

      logCount--;
      if(logCount <= 167) break;
    }

    data.push({
      time: new Date().toLocaleString(),
      cpu: cpuUsage,
      memory: ramUsage
    });

    fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");

    log.info("ログを保存しました");
  });
}