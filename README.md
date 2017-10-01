# Pre-Require

Pre-Require is a small global script that helps you create a module of an array object with required assets from a selected folder

This script will help you with variables while fetching assets.

**Example:**

Lets say I have 10 images;
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

Pre-Require works before the logic of your script starts working, so using variables in require() is just not the way to go.

Pre-Require requires all the files and creates an array from a selected folder. Import and use it the way you would use require, but with variables. You can evne array search in your assets.

## How to use?

First install Pre-Require globally;

~~~
npm install pre-require -g
~~~

Pre-Require takes 2 parametes;
path to the assets folder
javascript file returning the requred asset map imported to your script

~~~
pre-require images/ assets.js
~~~

You might use this manually when you add new assets to the destination file, bind this command to your file watcherscript, webpack config, or add it to your npm run build command from your `package.json`

And if we rewrite the image1.png to image10.png example again with this;

~~~JS
import Assets from './assets.js'
// assets.js would be the path of your output file, that Pre-Require command created.

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

This will return an array of assets matching the given pattern, currently this is the matched asset name.
In the future this will accept regexp or partial match.

~~~JS
import Assets from './assets.js'

let thirdImage = Assets.search("image3");
~~~

#### Assets.format

Similar to Assets.search, this will return all assets matching a given filetype

~~~JS
import Assets from './assets.js'

let PNGs = Assets.format("png");
~~~

For a full list of methods and usage see the API [reference](https://reference.url/missing)

~~~
Pre-Require -h
~~~

**NOTE:** Be careful that the file extension dot (file.type) is changed into an underscore (file_type).

**NOTE:** If your asset filename contains a hyphen (Fi-Le_type), it will turn into an underscore (Fi_Le_type)

You can use this module with any file that require() supports; image files (png, jpg, svg, etc), json files and javascript files.

### This is still WIP

Currently missing:

- Built-in asset search 
- Choosing the type of the asset (eg: regex folder parameter)

Help me make it better with your pull requests, they are more than welcome.

### Licence

MIT
