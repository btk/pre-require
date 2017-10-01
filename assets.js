// import this file for static assets
  let Obj = {
    asda_sda_json: require('./images/asda-sda.json'), asdasda_json: require('./images/asdasda.json'), qweqwe_json: require('./images/qweqwe.json'), vcvcvcv_json: require('./images/vcvcvcv.json'),
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
