module.exports = (grunt) => {
    var dev = grunt.option('build') === 'dev';
    var style = grunt.option('style') === 'light';
    var releaseHost = grunt.option('host');
    var releasePort = parseInt(grunt.option('port')) || 22;

    var cfg = {
        src: 'dist',
        serverHost: '0.0.0.0',
        serverPort: 9000,
        livereload: 35730
    };

    require('load-grunt-tasks')(grunt);
    var moment = require('moment');
    var datetime = moment().format('YYYYMMDDHHmmss');

    var serverDataJson = require('../server-data.json');
    var serverData = serverDataJson.serverData || [];
    var username = null;
    var password = null;
    var taskArray = [];


    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-ssh');

    serverData.forEach(function(item) {
        if (item.host === releaseHost) {
            username = item.username;
            password = item.password;
        }
    });

    grunt.initConfig({

        sftp: {
            deploy: {
                files: {
                    './': 'dist/**/*'
                },
                options: {
                    path: '/home/apps/demo/web/test' + (style ? '-light' : '') + (dev ? '-dev' : ''),
                    host: releaseHost,
                    port: releasePort,
                    username: username,
                    password: password,
                    showProgress: true,
                    srcBasePath: 'dist/',
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            }
        },
        sshexec: {
            clean: {
                command: 'sudo rm -rf /home/apps/demo/web/test' + (style ? '-light' : '') +  (dev ? '-dev' : '') + '/*',
                options: {
                    host: releaseHost,
                    port: releasePort,
                    username: username,
                    password: password
                }
            }
        },
        'string-replace': {
            dist: {
                files: [{
                    cwd: 'dist',
                    expand: true,
                    src: ['index.html'],
                    dest: './dist'
                }],
                options: {
                    replacements: [
                        {
                            pattern: '<!-- import livereload.js -->',
                            replacement: dev ? '<script type="text/javascript" src="//localhost:' + cfg.livereload + '/livereload.js"></script>' : ''
                        },
                        {
                            pattern: '/* import Publish Date */',
                            replacement: 'var publishDate = \'' + datetime + '\';'
                        }
                    ]
                }
            }
        },

        watch: {
            rebuild_all: {
                files: ['dist/**/*'],
                tasks: ['release'],
                options: {
                    spawn: false,
                    livereload: cfg.livereload
                }
            }
        }
    });

    grunt.registerTask('default', []);

    if (username &&
        password &&
        releaseHost) {
        taskArray.push('string-replace');
        taskArray.push('sshexec:clean');
        taskArray.push('sftp:deploy');
    }

    grunt.registerTask('release', taskArray);

};
