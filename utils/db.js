const fs = require("fs");

module.exports = {
  status:{
    add:(cpu,memory)=>{
      const data = JSON.parse(fs.readFileSync("./database/status.json","utf8"));

      data.push({
        time: new Date(),
        cpu: cpu,
        memory: memory
      });

      fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");
    },
    remove:()=>{
      const data = JSON.parse(fs.readFileSync("./database/status.json","utf8"));

      data.shift();

      fs.writeFileSync("./database/status.json",JSON.stringify(data),"utf8");
    }
  },
}