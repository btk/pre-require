# Pre-require

Pre-require is a small global script that helps you with creating a module of array object with required assets from the targeted folder.

This small trick will help you when you might need to use variables while fetching assets.

**Examples:**

Lets say I have 10 images named:
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

Require works before the logic of your script starts working, so using variables in require() is not possible. If require() could be used with variables it would be great, so that's what pre-require does.

Pre-require requires all the files and creates an array from the targeted folder, so you can import this array and use it in the way you would use require, but with variables. Also you can search through arrays in your assets.

## How to use?

First install pre-require globally:

~~~
npm install pre-require -g
~~~

pre-require takes 2 parametes, first is the path to the folder that your assets are in. Second parameter would be the JavaScript output file which returnes a required asset map.

~~~
pre-require images/assets.js
~~~

You can use it manually when you add new assets to the destination file, make it a task runner script or just add it to your npm run build command in your `package.json`

For example, if we rename image1 to image10:

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

The assets.js file exposes a wide range of methods for interacting with the data structure.

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


**NOTE:** Be careful that file extension dot (.) is changed into underscore ( _ ). Also if your assetfile has hyphen (-), it will be also be turned into underscore.

You can use this module with any file that require() supports; image files (png, jpg, svg, etc), json files or even in some extreme cases - javascript files.

**NOTE:** There is a lot to do, for example;
- Built-in asset search 
- Choosing the type of the asset that  (eg: regex folder parameter)
- Adding -h info. (done)

Help me make it better with your pull requests, they are welcome.

### Licence

MIT
