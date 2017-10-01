# Pre-require

Pre-require is a small global script; helps you create a module of array object with required assets from the folder that you point out.

This small trick would help you in the situations that you might need to use variables while fetching assets.

**For Example:**

Lets say I have 10 images named as:
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

Require works before the logic of your script starts working, using variables in require() is just not the way to go. As you might know, using require() in react is really nice and you will have some situations that if require would support variables, it would be perfect.

Pre-require, requires all the files and creates an array from the pointed folder that you decide. You can import this array and use it in the way you would use require, but with variables. You also can do array search in your assets.

## How to use?

First install the pre-require globallly:

~~~
npm install pre-require -g
~~~

Pre-require takes 2 parameters. The first parameter, is the path to the folder that your assets exists. The second parameter, would be the output javascript file that you will be importing to your script that is returning a required asset map.

~~~
pre-require images/ assets.js
~~~

You might use this manually when you, add new assets to the destination file, bind this command to your file watcher script or webpack config. Otherwise, you can just add it to your npm run build command from your `package.json`.

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

Similar to Assets. Search this will return all assets matching a given filetype.

~~~JS
import Assets from './assets.js'

let pngs = Assets.format("png");
~~~

For a full list of methods and usage see the api reference.

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
