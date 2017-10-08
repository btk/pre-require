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

const loopDirectory = (path, obj) => {
   let directoryToRead = [];
   return new Promise((resolve) => {
        fs.readdir(path, function(err, items) {
            items.forEach((file) => {
                let prePath = (path[path.length - 1] == "/")?path:path+"/";
                let stats = fs.lstatSync(prePath + file);
                let normalizeFileName = file.replace('.', '_').replace(/-/g, '_');
                if (stats.isDirectory()) {
                    obj[normalizeFileName] = {};
                    //push it to the array so that we can loop and perform recursion based on that folder
                    directoryToRead.push({
                       normalizeFileName,
                       path: prePath + file
                    });
                } else {
                    obj[normalizeFileName] = `require('${prePath + file}')`;
                }
            });

            if (directoryToRead.length === 0) {
                //if no more directory to read then we resolve it
                resolve(obj);
            } else {
                //if we still have directory to read then we loop and recurse it
                directoryToRead.forEach(val => {
                    loopDirectory(val.path, obj[val.normalizeFileName]).then(()=> {
                        //we still need to resolve it so that it parent can get resolved
                        resolve(obj);
                    });
                })
            }
        });
    });
};

loopDirectory (FOLDER_PATH, {}).then((val)=> {
    let assetsFileContent = `// import this file for static assets
  let Obj = {
    ${JSON.stringify(val).substr(1).slice(0, -1).replace(new RegExp('"', 'g'),'')},
    search: function(key) {
      if(this.hasOwnProperty(key)) {
        return this[key];
      } else {
        return -1;
      }
    },
    format: function(extention) {
      let filteredArray = this.filter(assetSlug => (assetSlug.includes("-"+extention)));
      if(filteredArray.length){
        return filteredArray;
      } else {
        return -1;
      }
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