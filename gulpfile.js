//- объявляем необходимые константы

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');

//- компилируем файлы pug в html
function pughtml() {

    return gulp.src('./src/pug/pages/**/*.pug', {allowEmpty:true})

    .pipe(plumber())

        .pipe(pug({pretty:true}))

        .pipe(gulp.dest('./build/'))

        .pipe(browserSync.stream());
}

//- компилируем файл style.scss в css
function style() {

    return gulp.src('./src/sass/style.scss', {allowEmpty:true})

    .pipe(plumber())

        .pipe(sourcemaps.init())

        .pipe(sass())

        .pipe(autoprefixer( {browsers: ['last 2 versions'], cascade: false} ))

        .pipe(sourcemaps.write())

        .pipe(gulp.dest('./build/css/'))

        .pipe(browserSync.stream());
}

//- копируем все файлы js из src/js в build/js
function copyJs () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

//- копируем все файлы с изображениями из src/img в build/img
function copyImgs () {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream());
}

//- очищаем build до компиляции вышеуказанных файлов
function cleanBuild () {
    return del('./build');
}

//- следим за изменениями во всех файлах в src для перезагрузки страницы с помощью browserSync
function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch('./src/sass/**/*.scss', style);
    gulp.watch('./src/pug/**/*.pug', pughtml);
    gulp.watch('./src/js/**/*.js', copyJs);  
    gulp.watch('./src/img/**/*.*', copyImgs);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload)
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload)
}

// exports
exports.compile = gulp.series(cleanBuild, copyImgs, pughtml, copyJs, style, watch);
exports.watch = exports.compile;
