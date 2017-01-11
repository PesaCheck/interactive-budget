// include gulp
var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var gulpUtil = require('gulp-util');
var webserver = require('gulp-webserver');
var ngConstant = require('gulp-ng-constant');

var PATHS = {
  node: "./node_modules/"
}

var deps = {
  js: [
    PATHS.node + "angular/angular.js",
    PATHS.node + "chart.js/dist/Chart.js",
    PATHS.node + "angular-ui-router/release/angular-ui-router.js",
    PATHS.node + "angular-ui-bootstrap/dist/ui-bootstrap.js",
    PATHS.node + "angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
    PATHS.node + "jquery/dist/jquery.js",
    PATHS.node + "angular-animate/angular-animate.js",
    PATHS.node + "underscore/underscore.js",
    PATHS.node + "angular-uuid/angular-uuid.js",
    PATHS.node + "angularfire/dist/angularfire.js",
    PATHS.node + "ngtweet/dist/ngtweet.js"
  ],
  css: [
    PATHS.node + "bootstrap/dist/css/bootstrap.css",
    PATHS.node + "bootstrap/dist/css/bootstrap.css.map",
    PATHS.node + "animate.css/animate.css",
    PATHS.node + "font-awesome/css/**"
  ],
  fonts: [
    PATHS.node + "boostrap/dist/fonts/**",
    PATHS.node + "font-awesome/fonts/**"
  ]
}

// build JS library dependencies
gulp.task("js-dependencies", function(){
   gulp.src(deps.js)
    .pipe(concat('pesacheck.deps.js'))
    // .pipe(uglify()).on('error', gulpUtil.log)
    .pipe(gulp.dest('./docs/js/'))

});
// build CSS library dependencies
gulp.task("css-dependencies", function(){
   gulp.src(deps.css)
    .pipe(concat('pesacheck.deps.css'))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task("fonts", function(){
  gulp.src(deps.fonts)
    .pipe(gulp.dest('./docs/fonts/'))
})

// main app files
gulp.task("main", function(){
   gulp.src([
       "./index.html",
       "./app.js",
       "./package.json"
   ])
   .pipe(gulp.dest("./docs/"));
});

// copy images
gulp.task("images", function(){
  gulp.src('images/**/**.**')
    .pipe(gulp.dest('./docs/images'));
})

// build html template files
gulp.task("templates", function(){
  gulp.src("templates/**/**.html")
    .pipe(flatten())
    .pipe(gulp.dest("./docs/tpls"))
});

// build js modules
gulp.task("js-modules", function(){
  gulp.src("js/**/**.js")
    .pipe(concat('pesacheck.js'))
    .pipe(gulp.dest('./docs/js'))
})

// build css modules
gulp.task("css-modules", function(){
  gulp.src("sass/**/**.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('pesacheck.css'))
    .pipe(gulp.dest('./docs/css'))
})

// serve a build
gulp.task('webserver', function(){
  gulp.src('docs')
   .pipe(webserver({
     livereload: true,
     open: true,
     fallback: 'index.html',
     port: 6271
   }));
});

// watch for file changes
gulp.task('watch', function(){
  return gulp.watch(['./**/**.**', '!./docs/**'], ['build'])
});

// build website
gulp.task('build', [
  'js-dependencies',
  'css-dependencies',
  'fonts',
  'main',
  'templates',
  'js-modules',
  'css-modules',
  'images'
])

gulp.task('deploy', ['build'] ,function(){
  return gulp.src("./docs/**/*")
    .pipe(deploy())
})

// run development
// default task
gulp.task('default', ['build','webserver','watch'])
