#!/usr/bin/env node

var fs = require("fs");

const FOLDER_PATH = (process.argv[2][0] == "./")?process.argv[2]:"./"+process.argv[2];
const MODULE_NAME = process.argv[3];


fs.readdir(FOLDER_PATH, function(err, items) {
  let slugArray = [];

  items.forEach((file) => {
    let prePath = (FOLDER_PATH[FOLDER_PATH.length - 1] == "/")?FOLDER_PATH:FOLDER_PATH+"/";
    slugArray.push(`${file.replace('.', '_').replace(/-/g, '_')}: require('${prePath + file}')`);
    // push as string
  });


  let assetsFileContent = `// import this file for static assets
  let Obj = {
    ${slugArray.join(', ')},
    search: function(key) {
      if(this.hasOwnProperty(key)) {
        return this[key]
      }
      else
        return -1;
    }
  }
  export default Obj;
  `;

  fs.writeFile (MODULE_NAME, assetsFileContent, function(err) {
      if (err) throw err;
      console.log('Pre-require');
      console.log('===========');
      console.log('Created module for required assets from ', FOLDER_PATH);
      console.log('Output file is: ' + MODULE_NAME);
  });

});
