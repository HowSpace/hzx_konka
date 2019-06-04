const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sprite = require('gulp.spritesmith');



// (先把iconfont.css压缩);
gulp.task('miniconfont', () => {
    return gulp.src('src/css/iconfont.css')
        .pipe(cssmin())
        .pipe(rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('dist/css'));
});
// 将easy_sass生成的min.css移入dist目录下;
gulp.task('movecss', () => {
    return gulp.src('src/css/*.min.css')
        .pipe(gulp.dest('dist/css'));
});
// 将html压缩并移到dist目录;
gulp.task('htmlmin', () => {
    return gulp.src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/html'));
});

// 将js先合并,放在src的js目录下;
gulp.task('js', () => {
    return gulp.src(['src/js/js/*.js', 'src/js/thirdplugins/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js'))
});
// 将转成es5的all.es5.js压缩,放入dist目录下;
gulp.task('minjs', () => {
    return gulp.src('src/js/all.es5.js')
        .pipe(rename('all.es5.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
// 将图片压缩成spritesmith_img;
// gulp.task('spriteimg', function() {
//     var spriteData = gulp.src('src/img/*.png')
//         .pipe(sprite({
//             imgName: 'sprite.png',
//             cssName: 'sprite.css'
//         }));
//     return spriteData.pipe(gulp.dest('dist/img'));
// });