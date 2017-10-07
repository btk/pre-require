#!/usr/bin/env node

var fs = require("fs");

function printUsage(code) {
  console.log(`Usage: ${__filename} [-h] <asset_folder> <output_file>`);
  console.log('  asset_folder: The folder containing the source assets for the module being created.');
  console.log('  output_file:  The resulting javascript source file where the module will be written. This file can be required after running pre-require to load the source assets.');
  process.exit(code || 0);
}

const args = process.argv.slice(2);

if (args.length === 1 && (args[0] === '-h')) {
  printUsage();
}

if (args.length !== 2) {
  console.log('Error: required command line arguments not provided.');
  printUsage(1);
}

const FOLDER_PATH = (args[0][0] == "./")?args[0]:"./"+args[0];
const MODULE_NAME = args[1];


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
    search: ${searchFile},
    format: ${searchFileFormat}
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

const searchFile = function(key) {
      if(this.hasOwnProperty(key)) {
        return this[key];
      } else {
        return -1;
      }
    }

const searchFileFormat = function(extension) {
      let filteredArray = this.filter(assetSlug => (assetSlug.includes("-"+extention)));
      if(filteredArray.length){
        return filteredArray;
      } else {
        return -1;
      }
    }
