class Upload{
  constructor(){
    if(!fs.existsSync(`./file/upload`)){
      fs.mkdirSync(`./file/upload`);
    }
  }
}