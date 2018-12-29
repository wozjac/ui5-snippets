// Karma configuration
// Generated on Sat Dec 29 2018 10:11:33 GMT+0100 (Central European Standard Time)
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["openui5", "qunit"],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: "**",
                included: false,
                served: true,
                watched: true
            }
        ],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "app/**/*.js": ["coverage"]
        },

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress", "coverage"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["ChromeHeadless"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        openui5: {
            path: "https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
        },

        client: {
            qunit: {
                testTimeout: 15000,
                autostart: false
            },
            openui5: {
                tests: [
                    "test/allTests.qunit"
                ],
                config: {
                    preload: "async",
                    libs: "sap.m",
                    theme: "sap_belize",
                    language: "EN",
                    resourceRoots: {
                        "RESOURCE.ROOT": "/base/webapp",
                        "test": "/base/webapp/test"
                    }
                }
            }
        },

        coverageReporter: {
            type: "text",
            dir: "coverage/"
        }
    });
};
