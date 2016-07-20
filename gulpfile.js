var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var htmlreplace = require("gulp-html-replace");

gulp.task("tscompile", function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript"),
	outFile: "app.js"
    });

    var tsResult = gulp.src([
        "node_modules/angular2/typings/browser.d.ts",
		"src/*.ts"
    ]).pipe(ts(tsProject));

    return tsResult.js.pipe(concat("app.min.js"))
        .pipe(uglify()).pipe(gulp.dest("build"));
});

gulp.task("getLibs", function() {
    gulp.src([
        "node_modules/es6-shim/es6-shim.min.js",
		"node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
		"node_modules/systemjs/dist/system-polyfills.js",
		"node_modules/angular2/bundles/angular2-polyfills.js",
		"node_modules/systemjs/dist/system.src.js",
		"node_modules/rxjs/bundles/Rx.js",
		"node_modules/angular2/bundles/angular2.dev.js",
		"node_modules/angular2/bundles/http.dev.js"
    ]).pipe(concat("libs.min.js")).pipe(uglify()).pipe(gulp.dest("build"));
});

gulp.task("getBoot", function() {
    gulp.src("app/boot.js").pipe(concat("boot.min.js"))
        .pipe(uglify()).pipe(gulp.dest("build"));
});

gulp.task("build", ["tscompile", "getLibs", "getBoot"], function() {
    gulp.src("index.html").pipe(htmlreplace({
        "libraries": "libs.min.js",
		"app": "app.min.js",
		"boot": "boot.min.js"
    })).pipe(gulp.dest("build"));

    gulp.src("app/*.{html,css}").pipe(gulp.dest("build/app"));
});
