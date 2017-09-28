// import this file for static assets
let Assets = {
  asda_sda_json: require('./asda-sda.json'),
  asdasda_json: require('./asdasda.json'),
  qweqwe_json: require('./qweqwe.json'),
  vcvcvcv_json: require('./vcvcvcv.json'),
  search: function(key) {
    if(this.hasOwnProperty(key))
      return Assets[key];
    else
      return -1;
  }
}

export default Assets;