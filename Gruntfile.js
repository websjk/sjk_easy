/*----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*建立web socket服务器
        livereload: {
            port: 35729 
        },

        //为文件建立站点，实现通过浏览器访问文件的功能
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },*/

        //监控到指定文件有变化时自动刷新浏览器
        watch: {

            img: {
                files: ['src/images/**/*.{png,jpg,jpeg,gif}'],
                options: {
                    livereload: true
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['src/css/*.css']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['src/js/*.js']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['src/html/*.html']
            }
        },

        //检验CSS语法
        csslint: {
            src: ['src/css/*.css']
        },

        //检验JS语法
        jshint: {
            all: ['src/js/*.js']
        },

        //合并任意文件
        concat: {
            css: {
                src: ['src/css/*.css'],
                dest: 'dist/css/all.css'
            },
            js: {
                src: ['src/js/*.js', '!*.min.js'],
                dest: 'dist/js/all.js'
            }
        },

        //压缩html文件
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/html/',
                    src: '**/*.html',
                    dest: 'dist/html/'
                }]
            }
        },

        //压缩CSS文件
        cssmin: {
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            minify: {
                expand: true,
                cwd: 'dist/css/',
                src: ['all.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },

        //合并压缩JS文件
        uglify: {
            target: {
                files: {
                    'dist/js/all.min.js': ['dist/js/all.js']
                }
            }
        },

        //压缩优化图片大小
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: 'dist/images/'
                }]
            }
        }

    });

    //载入插件声明
    //grunt.loadNpmTasks('grunt-contrib-livereload');  //建立web socket服务器，让页面同web socket通行
    //grunt.loadNpmTasks('grunt-contrib-connect'); //为文件建立站点，实现通过浏览器访问文件的功能
    grunt.loadNpmTasks('grunt-contrib-watch'); //监控哪些文件发生变化，当变化发生时，执行设定的任务
    grunt.loadNpmTasks('grunt-contrib-csslint'); //检验css语法
    grunt.loadNpmTasks('grunt-contrib-jshint'); //检验js语法
    grunt.loadNpmTasks('grunt-contrib-concat'); //合并文件
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //压缩html
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //压缩css
    grunt.loadNpmTasks('grunt-contrib-uglify'); //压缩js
    grunt.loadNpmTasks('grunt-contrib-imagemin'); //压缩图片 

    // 定义任务组合
    grunt.registerTask('build', ['csslint', 'jshint', 'concat', 'htmlmin', 'cssmin', 'uglify', 'imagemin']);
    grunt.registerTask('check', ['csslint', 'jshint']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('jscss', ['concat', 'cssmin', 'uglify']);
};
