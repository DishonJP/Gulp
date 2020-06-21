const gulp=require('gulp');
const sass=require('gulp-sass');
const html=require('gulp-html');
const image=require('gulp-imagemin');
const browserSync=require('browser-sync');

function style(){
    return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    gulp.watch('./scss/**/*.scss',style);
    gulp.watch('./*.html').on('change',browserSync.reload);
}

function markUp(){
    return gulp.src('index.html')
    .pipe(html())
    .pipe(gulp.dest('dist/'));
}

function images(){
    return gulp.src('assets/*')
    .pipe(image())
    .pipe(gulp.dest('dist/assets'));
}


exports.run=gulp.series(images,style,markUp);
exports.watch=watch;