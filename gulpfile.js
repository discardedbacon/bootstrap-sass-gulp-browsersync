/* ---- import packages for gulp ---- */
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	runSequence = require('run-sequence'),
	changed = require('gulp-changed'),
	del = require('del'),
	include = require('gulp-include'),
	plumber = require('gulp-plumber');

/* ---- file paths ----*/

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
	fontsDir : "fonts/bootstrap"	
}

/* ---- tasks ---- */

// convert scss to css, minify css
gulp.task('styles', function() {
	return gulp.src(bsk.appDir+'/'+bsk.scssDir+'/*.scss')
		.pipe(plumber())
		.pipe(sass({style: 'compact'}))
		.pipe(changed(bsk.appDir+'/'+bsk.scssDir+'/*.scss'))
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.cssDir))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.cssDir))
		.pipe(reload({stream:true}));
});

//minify js
gulp.task('js', function () {
    return gulp.src(bsk.appDir+'/'+bsk.jsDir+'/*.js')
    	.pipe(include())
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(changed(bsk.appDir+'/'+bsk.jsDir+'/*.js'))
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.minifiedJsDir))
		.pipe(reload({stream:true}));
});

//launch web server
gulp.task('connect', function () {
	return browserSync({
    notify: false,
    server: {
      baseDir: bsk.appDir
    }
	});
});

//move bootstrap3 assets from 'bower' to 'app'
// - js
gulp.task('init:js', function(){
	return gulp.src('./bower_components/bootstrap-sass/assets/javascripts/**')
		.pipe(gulp.dest(bsk.appDir+"/"+bsk.jsDir))
		.on('end', function(){
		return gulp.src('./bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.minifiedJsDir));
		});
});

//- fonts
gulp.task('init:fonts', function(){
	return gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/**')
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.fontsDir));
});

//- scss
gulp.task('init:scss', function(){
	return gulp.src('./bower_components/bootstrap-sass/assets/stylesheets/**')
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.scssDir));
});
gulp.task('init:renameSCSS', function(){
	return gulp.src(bsk.appDir+'/'+bsk.scssDir+'/_bootstrap.scss')
		.pipe(rename('bootstrap.scss'))
		.pipe(gulp.dest(bsk.appDir+'/'+bsk.scssDir));
});

//run page reloading, sass & js minification services
gulp.task('serve', ['connect'], function(){
		gulp.watch([bsk.appDir+'/**/*.html', bsk.appDir+'/**/*.htm'])
		.on('change', function(file){
			gulp.src(file.path)
			.pipe(reload({stream:true}));
		});
		gulp.watch(bsk.appDir+'/'+bsk.scssDir+'/**/*.scss', ['styles']);
		gulp.watch(bsk.appDir+'/'+bsk.jsDir+'/**/*.js',['js']);
});

/* ---- output folder ---- */

// clean output directory
gulp.task('clean', del.bind(null, [bsk.distDir]));
gulp.task('clean:prodDir', del.bind(null, [bsk.distDir+'/'+bsk.jsDir, bsk.distDir+'/'+bsk.scssDir]));

//move files to output folder
gulp.task('copy', ['clean'], function(){
	return gulp.src([bsk.appDir+'/**'])
    .pipe(gulp.dest(bsk.distDir));
});

//generate output folder
gulp.task('output', function() {
	runSequence('clean', 'copy', 'clean:prodDir');
});

/* ---- initialization ---- */

gulp.task('init', function() {
	runSequence(['init:js', 'init:fonts', 'init:scss'], 'init:renameSCSS', 'js', 'styles', 'serve');
});

gulp.task('default', function() {
	console.log('To start using the package, use "$ gulp init"');
	console.log('To resume Sass\'s "watch" tasks, use "$ gulp serve"');
	console.log('To create a clean output folder, use "$ gulp output"');
});