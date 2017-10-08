// import this file for static assets
  let Obj = {
    asas:{asasas:{tsconfig_json:require('./images/asas/asasas/tsconfig.json')},grgege:{asasas_html:require('./images/asas/grgege/asasas.html')},tsconfig_json:require('./images/asas/tsconfig.json')},asda_sda_json:require('./images/asda-sda.json'),asdasda_json:require('./images/asdasda.json'),qweqwe_json:require('./images/qweqwe.json'),vcvcvcv_json:require('./images/vcvcvcv.json'),
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
  