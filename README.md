# Pre-require

Pre-require is a small global script that helps you create a module of array object with the required assets from the folder of your choice.

This small trick could help you in situations where you might need to use variables while fetching assets.

**For Example:**

Let's say I have 10 images named as;
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

Require works before the logic of your script starts working, so using variables in require() is just not the way to go. But as you might know, using require() in react is really nice and you will have some situations where, if require() could support variables, it would be perfect.

Pre-require, requires all the files and creates an array from the pointed folder that you decide. You can import this array and use it the way you would use require, but with variables. Also you can do array search in your assets.

## How to use?

First install the pre-require globallly;

~~~
npm install pre-require -g
~~~

pre-require takes 2 parametes, first is the path to the folder where your assets exist. Second parameter would be the output javascript file that you will be importing to your script which is returning a required asset map.

~~~
pre-require images/ assets.js
~~~

You might use this manually, when you add new assets to the destination file, or bind this command to your file watcher script, or webpack config. or just add it to your npm run build command from your `package.json`

And if we rewrite the image1 to image10, example again with this;

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

The asset.js file exhibit a range of methods for interacting with the data structure

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

For a full list of methods and useage see the api reference

~~~
pre-require -h
~~~


**NOTE:** Be careful when file extension dot (.) is changed into underscore ( _ ). Also if your assetfile has a hyphen (-), it will also turn into an underscore.

You can use this module with any file that supports require() ; image files (png, jpg, svg, etc), json files or even some extreme cases, javascript files.

**NOTE:** There is a lot to do, for example;
- Built-in asset search 
- Choosing the type of the asset that  (eg: regex folder parameter)
- Adding -h info. (done)

Help me make it better with your pull requests, they are welcome.

### Licence

MIT
