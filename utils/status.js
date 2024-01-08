module.exports = ()=>{
  const os = require("os");

  const cpus = os.cpus();
  const totalIdle = cpus.reduce((acc,cpu)=>acc + cpu.times.idle,0);
  const totalTick = cpus.reduce((acc,cpu)=>{
    Object.values(cpu.times).forEach(time=>acc += time);
    return acc;
  },0);
  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const cpu = (100 - (100*idle) / total).toFixed(1);

  const memory = (100 - ((os.freemem()/os.totalmem())*100)).toFixed(1);

  return { cpu, memory };
}