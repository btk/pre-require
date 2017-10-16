# Pre-require

Pre-require is a small global script, which helps you create a module of array objects with required assets from the folder that you direct it to.

This small trick helps you in situations that you might need to use variables while fetching assets.

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

Require works before the logic of your script starts working, so using variables in require() is not the optimal direction. But, as you might know, using require() in React works really well and you will inevitably have situations where if only require would support variables, it would be perfect for your needs.

Pre-require, requires all the files and creates an array from the folder you direct it to, so you can import this array and use is the way you would use require, but with variables. Additionally, you can do array searches in your assets.

## How to use?

First install the pre-require globally:

~~~
npm install pre-require -g
~~~

Pre-require takes 2 parameters: First parameter is the path to the folder that your assets exist in. The second parameter is the output Javascript file that you will be importing to your script which is returning a required asset map.

~~~
pre-require images/ assets.js
~~~

You might use this manually, when you add new assets to the destination file, or bind this command to your file watcher script, or webpack config or just add it to your npm run build command from your `package.json`

Once more, an example of rewriting image1 to image10 with pre-require:

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

For a full list of methods and usage see the API reference

~~~
pre-require -h
~~~


**NOTE:** Be careful that file extension dot (.) is changed into underscore ( _ ). Also if your asset file has hyphen (-), it will automatically be transformed into an underscore.

You can use this module with any file that require() supports; image files (png, jpg, svg, etc), json files or, even in some extreme cases, Javascript files.

**NOTE:** There is a lot to do, for example;
- Built-in asset search
- Choosing the type of the asset that  (eg: regex folder parameter)
- Adding -h info. (done)

Help me make it better with your pull requests, they are welcome.


### Contributing
Development of pre-require happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. If you intend to make any non-trivial changes to pre-require's implementation, we recommend filing an issue. This lets us reach an agreement on your proposal before you put significant effort into it. If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing.

#### Development
Working on a feature or bug fix? We sugges that you follow the following pattern:
1. Fork the repository and create your branch from master.
2. Write some code! Use `npm run start` to transpile and run `index.js`. If you would like the output of the transpiled code run `npm run transpile` and view the output at `transpiled.js`.
3. If you’ve added code that should be tested, add tests!
4. Make to update the appropriate documentation if needed.
5. Ensure the test suite passes.


#### Testing
We use Jest for tests, to start tests locally;

~~~
npm run test
~~~

To watch the changes made in the test scripts, use;

~~~
npm run test:watch
~~~

##### Code Coverage
Jest includes the ability to analyze test code coverage. When running the test tasks, coverage reports are generated and output to the `/coverage` directory. To view the HTML report, open `/coverage/index.html` in a browser.

### Licence

MIT
