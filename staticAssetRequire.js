var fs = require("fs");

const FOLDER_PATH = "data/images/";
const MODULE_NAME = "pre-require-assets.js"

fs.readdir(FOLDER_PATH, function(err, items) {
  let slugArray = [];

  items.forEach((file) => {
    slugArray.push(`${file}: require('${FOLDER_PATH + file}')`);
    // push as string
  });


  let assetsFileContent = `// import this file for static assets
  let Obj = {
    ${slugArray.join(', ')}
  }
  export default Obj;
  `;

  fs.writeFile (MODULE_NAME, assetsFileContent, function(err) {
      if (err) throw err;
      console.log('Created module for required assets in specified folder');
  });

});
