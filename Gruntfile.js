// Generated on 2014-03-23 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path    = require('path'),
    fs      = require('fs');

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var yeoman = {
        // configurable paths
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: yeoman,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: [
                    "<%= yeoman.app %>/styles/scss/**/{,*/}*.scss",
                    "<%= yeoman.app %>/components/**/{,*/}*.scss",
                    "<%= yeoman.app %>/directives/**/{,*/}*.scss",
                    "<%= yeoman.app %>/pages/**/{,*/}*.scss",
                    "<%= yeoman.app %>/scripts/lib/**/{,*/}*.scss"
                ],
                tasks: ['compass:dev']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729,
                middleware: function (connect, options) {
                    var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
                    return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
                        optBase.map(function (path) {
                            return connect.static(path);
                        }));
                }
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        ngconstant: {
            options: {
                wrap: '"use strict";\n\n <%= __ngModule %>',
                deps: false,
                constants: {
                    env: require('./environments/all')
                },
                space: ' '
            },
            development: [
                {
                    dest: '<%= yeoman.app %>/scripts/config/env/constants.js',
                    name: 'swamp.config',
                    constants: {
                        env: require('./environments/development')
                    }
                }
            ],
            production: [
                {
                    dest: '<%= yeoman.app %>/scripts/config/env/constants.js',
                    name: 'swamp.config',
                    constants: {
                        env: require('./environments/production')
                    }
                }
            ]
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            swamp: {
                options: { force: true },
                files: [{
                    dot: true,
                    src: [
                        '../swamp/dashboard/views',
                        '../swamp/dashboard/public'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },




        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            dev: {
                options: {
                    sassDir: '<%= yeoman.app %>/styles/scss',
                    cssDir: '<%= yeoman.app %>/styles/',
                    specify: '<%= yeoman.app %>/styles/scss/main.scss'
                }
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated',
                    sassDir: '<%= yeoman.app %>/styles/scss',
                    cssDir: '<%= yeoman.app %>/styles/',
                    specify: '<%= yeoman.app %>/styles/scss/main.scss'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'pages/{,*/}*.html','components/{,*/}*.html','directives/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'assets/**/*',
                        'pages/**/*.html',
                        'components/**/*.html',
                        'directives/**/*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },

            // copy the swamp dashboard compiled files into the swamp project
            swamp: (function() {

                var copy_swamp = {};

                if(fs.existsSync('../swamp')) {

                    copy_swamp = {
                        files: [{
                            expand: true,
                            dot: true,
                            cwd: '<%= yeoman.dist %>',
                            dest: '../swamp/dashboard/public/',
                            src: [
                                'scripts/**/*',
                                'styles/**/*',
                                'assets/**/*'
                            ]
                        }, {
                            expand: true,
                            dot: true,
                            cwd: '<%= yeoman.dist %>',
                            dest: '../swamp/dashboard/views/',
                            src: [
                                'index.ejs'
                            ]
                        }]
                    };

                }

                return copy_swamp;
            })()
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        ngtemplates: {
            dest:          {
                src:        ['<%= yeoman.dist %>/pages/**/*.html','<%= yeoman.dist %>/directives/**/*.html','<%= yeoman.dist %>/components/**/*.html'],
                dest:       '<%= yeoman.dist %>/scripts/templates.js',
                options:{
                    bootstrap: function(module, script) {
                        return "app.run(['$templateCache', function($templateCache){ "+ script.replace(/dist\//g,'') + "} ]);"
                    },
                    htmlmin: {
                        collapseBooleanAttributes:      false,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          false,
                        removeRedundantAttributes:      false,
                        removeScriptTypeAttributes:     false,
                        removeStyleLinkTypeAttributes:  false
                    }
                }
            }
        },

        exec: {
            gitAddSwampDashboardAssets: {
                cwd: '../swamp',
                cmd: 'git add --all -f dashboard/ '
            },

            gitCommitSwampDashboard: {
                cwd: '../swamp',
                cmd: 'git commit dashboard/* -m "Build Dashboard"'
            }
        }
    });

    // creates the .ejs file from the .html
    grunt.registerTask('converthtml', function() {
        var html = fs.readFileSync(path.resolve(yeoman.dist, 'index.html'));

        fs.writeFileSync(path.resolve(yeoman.dist, 'index.ejs'), html);

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            //'bower-install',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        //'bower-install',
        'ngconstant:production',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'ngtemplates',
        'rev',
        'usemin',
        'htmlmin',
        'converthtml',
        'clean:swamp',
        'copy:swamp',
        'exec:gitAddSwampDashboardAssets',
        'exec:gitCommitSwampDashboard',
        'ngconstant:development'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
