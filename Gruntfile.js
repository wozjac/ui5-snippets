/* global module, require */
var proxySnippet = require("grunt-connect-proxy/lib/utils").proxyRequest;

module.exports = function (grunt) {
    "use strict";

    var protocol = grunt.option("protocol");
    if (protocol === undefined) {
        protocol = "https";
    }

    grunt.initConfig({

        dir: {
            app: "webapp",
            dist: "dist",
            test: "webapp/test",
            bower_components: "bower_components"
        },

        proxy: {
            host: "PROXY.HOST.COM"
        },

        connect: {
            options: {
                hostname: "localhost"
            },
            local: {
                options: {
                    port: 8085,
                    livereload: 35729
                }
            },
            remote: {
                options: {
                    port: 8889,
                    base: "<%= dir.app %>",
                    protocol: protocol,
                    livereload: 35730,
                    middleware: function (connect, options) {
                        return [proxySnippet,
                                require("serve-static")(options.base[0])
                        ];
                    }
                },
                proxies: [{
                    context: "/sap/opu/odata",
                    host: "<%= proxy.host %>",
                    https: protocol === "https" ? true : false,
                    secure: false
                        }, {
                    context: "/resources",
                    host: "<%= proxy.host %>",
                    https: protocol === "https" ? true : false,
                    secure: false,
                    rewrite: {
                        "/resources": "/sap/public/bc/ui5_ui5/resources"
                    }
                }]
            }
        },

        openui5_connect: {
            options: {
                resources: [
					"<%= dir.bower_components %>/openui5-sap.ui.core/resources",
					"<%= dir.bower_components %>/openui5-sap.m/resources",
					"<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources",
                    "<%= dir.bower_components %>/openui5-sap.ui.layout/resources"
				]
            },
            local: {
                options: {
                    appresources: "<%= dir.app %>",
                    testresources: "<%= dir.test %>"
                }
            }
        },

        openui5_preload: {
            component: {
                options: {
                    resources: {
                        cwd: "<%= dir.app %>", // path to app root folder
                        prefix: "RESOURCE_ROOT", // namespace prefix (in case the namespace is not already in folder structure like sap/ui/core/**)
                        src: [
				            "**/*.js",
				            "!**/Component-preload.js",
                            "**/*.fragment.html",
                            "**/*.fragment.json",
                            "**/*.fragment.xml",
                            "**/*.view.html",
                            "**/*.view.json",
                            "**/*.view.xml",
                            "**/*.properties",
                            "!test/**",
                            "!indexLocal.html",
                            "!localService/**"
						]
                    },
                    dest: "<%= dir.dist %>" // destination for the Component-preload.js file
                },
                components: true
            }
        },

        clean: {
            dist: "<%= dir.dist %>/"
        },

        copy: {
            dist: {
                files: [{
                        expand: true,
                        cwd: "<%= dir.app %>",
                        src: [
							"**",
							"!test/**",
                            "!indexLocal.html",
                            "!localService/**"
						],
                        dest: "<%= dir.dist %>"
					}
				]
            }
        },

        eslint: {
            files: ["<%= dir.app %>/**/*.js", "test/**/*.js"]
        },

        qunit: {
            all: {
                options: {
                    urls: [
						"http://<%= connect.options.hostname %>:<%= connect.local.options.port %>/test/unit/unitTests.qunit.html"
					]
                }
            }
        },

        open: {
            local: {
                path: "http://<%= connect.options.hostname %>:<%= connect.local.options.port %>/indexLocal.html",
                app: "Chrome",
                options: {
                    delay: 500
                }
            },
            proxy: {
                path: protocol + "://<%= connect.options.hostname %>:<%= connect.remote.options.port %>",
                app: "Chrome",
                options: {
                    delay: 500
                }
            }
        },

        watch: {
            livereloadLocal: {
                options: {
                    livereload: "<%= connect.local.options.livereload %>"
                },
                files: ["<%= dir.app %>/**"]
            },
            livereloadRemote: {
                options: {
                    livereload: "<%= connect.remote.options.livereload %>"
                },
                files: ["<%= dir.app %>/**"]
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-openui5");
    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-qunit-junit");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("openui5-local", ["openui5_connect:local"]);

    grunt.registerTask("local", [
        "openui5-local",
        "open:local",
        "watch:livereloadLocal"
    ]);

    grunt.registerTask("proxy", [
        "configureProxies:remote",
        "open:remote",
        "connect:remote",
        "watch:livereloadRemote"]);

    grunt.registerTask("test", ["openui5-local", "qunit_junit", "qunit"]);
    grunt.registerTask("build", ["clean", "openui5_preload", "copy"]);
    grunt.registerTask("default", ["eslint", "build"]);
};
