# Bootstrap, Sass, Gulp & BrowserSync

This package of scripts gives you a starting point for building a website with [Bootstrap](http://getbootstrap.com/), [Sass](http://sass-lang.com/) and [Gulp](http://gulpjs.com/). [BrowserSync](http://www.browsersync.io/) built into the package allows you to confirm every code changes in a browser window on the fly. It is hoped to make your workflow faster, and more functionalities will be added until it can be used as a true alternative to [Google Web Starter Kit](https://github.com/google/web-starter-kit).

## Dependencies
- [Node/NPM](http://nodejs.org/)
- Ruby/Gems
- Sass
- [Bower](http://bower.io/)
- Gulp

## How to Install
Download the package, and place all the files on the root level of your project's directory. Then do the following:

1. Install Bootstrap3 Sass (Official) with Bower.
`$ bower install bootstrap-sass-official`

2. Install gulp.js and other Node.js modules.
`$ npm install`

3. Run gulp to configure.
`$ gulp init`

At the end of initialization process, BrowserSync will launch a local web server, open a new browser window/tab and load a barebone html template (index.html).

## How It Works
- Working files for development are in the **'/app'** directory.
- The site's preview (http://localost:3000/) will refresh everytime a scss, js, or html file gets updated.
- To suspend Sass's _'watch'_ tasks, hit `control`+ `c`.
- To resume Sass's _'watch'_ tasks, run `gulp serve`.
- To create a clean output folder, run `gulp output`. It will create a new **'/dist'** directory.

### Directories
Default directory names are specified as follows in **gulpfile.js** By simply changing the bsk object's properties, you'll be able to use different directory names.

```
//working folder
var bsk = {
	appDir : "app",
//folder for distribution
	distDir :"dist",
//css folder name
	cssDir : "css",
//scss folder name
	scssDir : "stylesheets",
//minified js folder name
	minifiedJsDir : "js",
//uncompressed js folder name
	jsDir : "javascripts",
//font folder name
	fontsDir : "fonts"
}

```

### Methods to include Bootstrap's Javascript components

The **app/javascripts/bootstrap/** directory contains Bootstrap's Javascript components for add-on features, such as 'alerts', 'buttons', and 'tooltip'.

To use the components:

Open **app/javascripts/bootstrap-sprockets.js** and apped .js to file names you would like to use.

Foe example,

`//= require ./bootstrap/tooltip`

should be

`//= require ./bootstrap/tooltip.js`

The conpenent's codes will be inserted into **app/js/bootstrap-sprockets.min.js**. Make sure to include the minified Javascript file in your templates.

Refer to the [gulp-include](https://www.npmjs.org/package/gulp-include) page to learn more on how the Javascript files are included.

## Credits
Some parts of Gulpfile.js are based on [gaspanik/bootstrap3-sass-gulp](https://github.com/gaspanik/bootstrap3-sass-gulp) by [@cypher](twitter.com/cipher).

##License
Code and documentation copyright of Bootstrap 3 are owned by Twitter, Inc, with code released under the MIT license and docs released under Creative Commons.

Each Node.js module may have different terms of use.
