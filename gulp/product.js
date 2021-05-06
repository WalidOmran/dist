let { src, dest , series, watch } = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    beeper = require('beeper'),
    notifier = require('node-notifier'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');


const htmlFile = () => {
  return src('src/*.html')
  .pipe(dest('dist/'));
};
// imgFile Task 
const imgFile = () => {
  return src('src/content/assetts/img/*.{png,jpg}')
      .pipe(imagemin())
  .pipe(dest('dist/content/assetts/img'))
};
// svgFile Task 
const svgFile = () => {
  return src('src/content/assetts/svg/*.svg')
      .pipe(imagemin())
  .pipe(dest('dist/content/assetts/svg'))
};
const minifyltrcss = () => {
        return src(['src/content/css/vendor/bootstrap-ltr/bootstrap.min.css',
                        'src/content/css/vendor/*.css',
                         'src/content/css/main-ltr.css'])
            .pipe(sourcemaps.init())
            .pipe(concat('main-ltr.min.css'))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('.'))
            .pipe(dest('dist/content/css'));
};
const minifyrtlcss = () => {
        return src(['src/content/css/vendor/bootstrap-rtl/bootstrap.rtl.min.css',
                        'src/content/css/vendor/*.css',
                         'src/content/css/main-rtl.css'])
            .pipe(sourcemaps.init())
            .pipe(concat('main-rtl.min.css'))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('.'))
            .pipe(dest('dist/content/css'));
};

const minifyJs = () => { 
        return src(['src/content/js/vendor/jquery-3.5.1.min.js',
                         'src/content/js/vendor/*.js',
                         'src/content/js/main.js'])
         .pipe(concat('scripts.min.js'))
         .pipe(uglify()) 
         .pipe(dest('dist/content/scripts'));
 };



 const SassCompile = () => { 
    return src(['src/content/sass/main-ltr.scss','src/content/sass/main-rtl.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error',function(err){
            console.log(`-----------------------------------------------------------------`);
            console.log(err.message);
            console.log(`-----------------------------------------------------------------`);
            beeper();
             
            notifier.notify(
                {
                  title: 'Sass Error Compiling',
                  message: `Error in File : ${err.relativePath} \nError in Line : ${err.line} , Column : ${err.column} `,
                  sound: false, 
                  wait: false,
                  timeout: 1
                },
                function(err, response) {
                  // Response is response from notification
                }
              );
            this.emit('end');
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('src/content/css'))
        
};

const watcher = cb => {
    watch(['src/content/sass/*.scss',
                'src/content/sass/*/*.scss',
                'src/content/js/*.js',
                'src/*.html',
                'src/content/assetts/**/*.{png,jpg}',
                'src/content/assetts/svg/*.svg'], 
    series([SassCompile,minifyltrcss,minifyrtlcss,minifyJs,htmlFile,imgFile,svgFile]));
    cb()
};

module.exports = {
  SassCompile,
  minifyltrcss,
  minifyrtlcss,
  minifyJs,
  htmlFile,
  imgFile,
  svgFile,
  watcher

}