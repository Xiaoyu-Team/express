/**
 * isam2016 合并成express文件
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp'); //  引入 gulp

var cache = require('gulp-cache'); //清除缓存
var plumber = require('gulp-plumber'); // 监控错误
var clean = require('gulp-clean');
var notify = require('gulp-notify'); // 加控制台文字描述用的
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var removeUseStrict = require("gulp-remove-use-strict");
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create(); // browser-sync 实时刷新
var reload = browserSync.reload;

// NODE_ENV
var env = process.env.NODE_ENV || 'development'
var condition = env === 'production'
console.log(condition);

/**
 * 错误输出
 * @param {any} error 
 */
var onError = function(error) {
    var title = error.plugin + ' ' + error.name;
    var msg = error.message;
    var errContent = msg.replace(/\n/g, '\\A '); // replace to `\A`, `\n` is not allowed in css content
    // system notification
    notify.onError({
        title: title,
        message: errContent,
        sound: true
    })(error);
    // prevent gulp process exit
    this.emit('end');
};

// js
gulp.task('script', function() {

    return gulp.src(['./express/utils.js','./express/main.js', './express/request.js','./express/application.js', './express/express.js'])
        .pipe(plumber(onError))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('express.js'))
        .pipe(removeUseStrict())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('clean', function() {
    return gulp.src('build/', {
            read: false
        })
        .pipe(clean());
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        baseDir: '',
        // 是否开启多端同步
        ghostMode: {
            click: false, // 同步点击
            scroll: false // 同步滚动
        },
        // 自动打开浏览器
        open: true,
        // 使用端口`
        port: '8080'

    })
    //gulp.start('watch')
})


//dev构建  
gulp.task('default', function(done) {
    condition = false;

    //依次顺序执行  
    runSequence(
        ['clean'], /* ['server'], */ ['script'],
        done);

    gulp.watch("express/**/*.js", function() {

        runSequence(
            ['script'])
    }).on('change', reload);

});