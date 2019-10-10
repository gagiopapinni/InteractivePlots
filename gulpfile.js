const path = require("path");
const gulp = require("gulp");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

let debug = false;

let jsx = function () {
  return gulp.src(["src/*.js"])
     .pipe(babel({
        presets:["@babel/preset-react"],
     }))
    .pipe(gulp.dest("./build/temp"));
};

let bundle =  function () {
  return gulp.src(["build/temp/index.js"])
    .pipe(webpack({
  
         entry: "./build/temp/index.js", 
         output: {
             filename: "bundle.js"
         },
         devtool: debug?"source-map":false
     }))
    .pipe(gulp.dest("./build"));
};

gulp.task("debug",gulp.series(()=>{debug=true;return Promise.resolve();},jsx,bundle));
gulp.task("default",gulp.series(jsx,bundle));


