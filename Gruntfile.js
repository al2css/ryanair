module.exports = function(grunt) {
    // Without matchdep, we would have to write grunt.loadNpmTasks("grunt-task-name"); for each dependency, which would quickly add up as we find and install other plugins.
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // JavaScript files grouping [ destination : source ]
    var jsConcatFiles = {
        'js/cmp/global.min.js': ['js/*.js']
    };

    // Watch directories
    var watchDirs = [
        'inc/**/',
        'app/**/',
        'partials/**/',
        'page-templates/**/',
        'languages/**/',
        'fonts/**/',
        'js/**/',
        '!js/cmp/**/',
        'css/**/',
        '!css/cmp/**/',
        'images/**/'
    ];

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            prod: { // Target
                options: { // Target options, compressed, nested, expanded, compact
                    trace: true,
                    watch: true,
                    force: true,
                    noLineComments: true,
                    debugInfo: false,
                    assetCacheBuster: true,
                    sassDir: 'sass',
                    cssDir: 'css',
                    httpImagesPath: '../../images',
                    outputStyle: 'compressed',
                    raw: 'preferred_syntax = :sass\n',
                    environment: 'production'
                }
            },
            dev: { // Another target
                options: {
                    trace: true,
                    watch: true,
                    force: true,
                    noLineComments: true,
                    debugInfo: false,
                    assetCacheBuster: true,
                    sassDir: 'sass',
                    cssDir: 'css',
                    httpImagesPath: '../../images',
                    outputStyle: 'compact',
                    raw: 'preferred_syntax = :sass\n',
                    environment: 'development'
                }
            }
        },

        uglify: {
            options: {},
            prod: {
                options: {
                    beautify: false,
                    sourceMap: false,
                    sourceMapName: 'js/cmp/global.min.map',
                    mangle: true, 
                    //Specify mangle: false to prevent changes to your variable and function names.
                    // mangle: {
                    //     except: ['jQuery', 'Backbone']
                    // },
                    compress: {
                        global_defs: {
                            "DEBUG": false
                        },
                        dead_code: true,
                        drop_console: true // turnoff console warnings
                    }
                },
                files: {
                    'js/cmp/global.min.js': ['js/sources/*.js', 'app/*.js', 'app/**/*.js']
                }
            },

            dev: {
                options: {
                    beautify: true,
                    sourceMap: true,
                    sourceMapName: 'js/cmp/global.min.map',
                    mangle: false,
                    compress: {
                        global_defs: {
                            "DEBUG": true
                        },
                        dead_code: false,
                        drop_console: false // turnon console warnings
                    }
                },

                files: {
                    'js/cmp/global.min.js': ['js/sources/*.js', 'app/*.js', 'app/**/*.js']
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9'],
                safe: true
            },
            single_file: {
                src: 'css/sources/global.css',
                dest: 'css/cmp/global.min.css'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            prod: {
                tasks: ['esteWatch', 'compass:prod', 'uglify:prod', 'autoprefixer:single_file']
            },
            dev: {
                tasks: ['esteWatch', 'compass:dev', 'uglify:dev', 'autoprefixer:single_file']
            }
        },

        esteWatch: {
            options: {
                dirs: watchDirs,
                livereload: {
                    enabled: true,
                    port: 35729,
                    extensions: ['js', 'css', 'php', 'png', 'jpg', 'gif', 'html']
                }
            },

            js: function(filepath) {
                grunt.config(['uglify', 'dist', 'src'], filepath);
                return ['uglify:dev'];
            },

            css: function(filepath) {
                grunt.config(['autoprefixer', 'dist', 'src'], filepath);
                return ['autoprefixer:single_file'];
            }
        }

    });

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    // grunt.registerTask('default', ['compass', 'concat', 'uglify', 'imagemin', 'watch']);
    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('prod', ['concurrent:prod']);

    grunt.registerTask('hasfailed', function() {
        if (grunt.fail.errorcount > 0) {
            grunt.log.write('\x07');
            return false;
        }
    });

    grunt.registerTask('deployjs', ['uglify:prod']);
    grunt.registerTask('deploycss', ['autoprefixer:single_file']);
    // grunt.registerTask('forcecss', ['shell:compileCss', 'autoprefixer:multiple_files']);
    // grunt.registerTask('forcejs', ['concat_sourcemap']);
    // grunt.registerTask('dev', ['concurrent:dev']);
    // grunt.registerTask('cssProd', ['compass:prod']);
    // grunt.registerTask('js', ['esteWatch:js']);
    // grunt.registerTask('css', ['concurrent:css']);

};
