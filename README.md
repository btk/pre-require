# Pre-require

Pre-require is a small global script, that helps you create a module of object array with required assets from your desired folder.
This trick can help you in situations where you might need to use variables while fetching assets.

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

The require() function works before the the script starts working, so you don't use variables in this function. But we will use the require() function inside react() which will help us support variables inside it.
The Pre-require, takes all the files from your pointed folder and creates an array, so you can import this array and use it as per your require() along with variables. Apart from this, you can also do array search in your assets.

### How to use?

First install the pre-require globally;

~~~
npm install pre-require -g
~~~

pre-require takes two parametes, first is the path to the folder where your assets exist. Second parameter would be the output javascript file that you will import to your script which returns the required asset map.

~~~
pre-require images/ assets.js
~~~

You may use this when:
- You add new assets to the destination file or
- When you want to bind this command to your file watcher script or webpack config. Just add it to your npm run build command from your `package.json`

And if we rewrite the image1 to image10 for example again;

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

### Methods

The asset.js file exposes a range of methods for interacting with the data structure

#### Assets.search

This will return an array of assets matching the given pattern, currently this is just the matched asset name. In the future this will accept a regexp or partial match.

~~~JS
import Assets from './assets.js'

let thirdImage = Assets.search("image3");
~~~

#### Assets.format

Similar to Assets.search this will return all assets matching a given filetype.

~~~JS
import Assets from './assets.js'

let pngs = Assets.format("png");
~~~
For a full list of methods and usage see the API reference.
~~~
pre-require -h
~~~

**NOTE:** 
Be careful that file extension dot (.) is changed into underscore ( _ ). Also, if your assetfile has hyphen (-), it will be also turn into underscore.

You can use this module with any file that require() supports; image files (png, jpg, svg, etc), json files or even in some extreme cases, javascript files.

**NOTE:**
There is a lot to do, for example;
- Built-in asset search 
- Choosing the type of the asset eg: regex folder parameter
- Adding -h info. (done)

Help me make it better with your pull requests, they are welcome.

### Licence

MIT
