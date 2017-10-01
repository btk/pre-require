# Pre-require

Pre-require is a small global script that helps its users create a module of array objects with inclusion of required assets from the specified folder.

This script would be the ideal help you in the situations where you might need to use variables while fetching assets.

**For Example:**

Lets say I have 10 images named as;
- image1.png
- image2.png
- ...
- image10.png

~~~JS
let i = 1;
let imageArray = [];
while(i <= 10){
  imageArray.push(require("image"+ i +".png"));
  // Won't work.
  i++;
}
~~~

Require executes before the remaining lines of your script starts executing, therefore variables in require() is not supported. 
As common consensus using require() in react is common practice therefore future scenarios were require would support variables, it would be the perfect outcome.

Pre-require, requires all the files and creates an array from the specified folder of your selection, so as you can import this array and use it as you would use require, with the added benefit of variables. Furthermore you can perform array search within your assets.

## How to use?

First install the pre-require globally;

~~~
npm install pre-require -g
~~~

pre-require takes 2 parameters, first is the path to the folder that your assets exists. Second parameter would be the output JavaScript file that you will be importing to your script which is returning a required asset map.

~~~
pre-require images/ assets.js
~~~

You might use this manually, when you add new assets to the destination file, or bind this command to your file watcher script, or webpack config. Or just add it to your npm run build command from your `package.json`

And if we rewrite the image1 to image10 example again with this;

~~~JS
import Assets from './assets.js'
// assets.js would be the path of your output file, that pre-require command created.

let i = 1;
let imageArray = [];
while(i <= 10){
  imageArray.push(Assets["image"+ i +"_png"]);
  i++;
}
~~~

## Methods

The asset.js file exposes a range of methods for interacting with the data structure

#### Assets.search

This will return an array of assets matching the given pattern, currently this is just the matched asset name. In the future this will accept a regexp or partial match.

~~~JS
import Assets from './assets.js'

let thirdImage = Assets.search("image3");
~~~

#### Assets.format

Similar to Assets.search this will return all assets matching a given filetype

~~~JS
import Assets from './assets.js'

let pngs = Assets.format("png");
~~~

For a full list of methods and usage see the api reference

~~~
pre-require -h
~~~


**NOTE:** Be careful that file extension dot (.) is changed into underscore ( _ ). Also if your assetfile has hyphen (-), it will be also turn into underscore.

You can use this module with any file that require() supports; image files (png, jpg, svg, etc), json files or even some extreme cases, javascript files.

**NOTE:** There is a lot to do, for example;
- Built-in asset search 
- Choosing the type of the asset that  (eg: regex folder parameter)
- Adding -h info. (done)

Help me make it better with your pull requests, they are welcome.

### Licence

MIT
