// import this file for static assets
  let Obj = {
    asda_sda_json: require('./test-assets/asda-sda.json'), asdasda_json: require('./test-assets/asdasda.json'), data_json: require('./test-assets/data.json'), image_a_jpg: require('./test-assets/image-a.jpg'), image_a_png: require('./test-assets/image-a.png'), image_b_png: require('./test-assets/image-b.png'), qweqwe_json: require('./test-assets/qweqwe.json'), vcvcvcv_json: require('./test-assets/vcvcvcv.json'),
    search: function searchFile(key) {
  if (this.hasOwnProperty(key)) {
    return this[key];
  } else {
    return -1;
  }
},
    format: function searchFileFormat(extension) {
  var filteredArray = this.filter(function (assetSlug) {
    return assetSlug.includes("-" + extention);
  });
  if (filteredArray.length) {
    return filteredArray;
  } else {
    return -1;
  }
}
  }
  export default Obj;
