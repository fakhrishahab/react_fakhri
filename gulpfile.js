var gulp = require('gulp'),
	concat = require('gulp-concat'),
	del = require('del');

gulp.task('script', function(){
	return gulp.src('src/**/*')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/src'));
})

gulp.task('style', function(){
	return gulp.src('style/**/*')
		.pipe(gulp.dest('build/style'))
})

gulp.task('watch', function(){
	gulp.watch('src/**/*', ['script']);
	gulp.watch('style/**/*', ['style']);
});

gulp.task('default', ['watch','script', 'style']);