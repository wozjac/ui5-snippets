module.exports = function (config) {
    config.set({
        frameworks: ["ui5"],
        browsers: ["ChromeHeadless"],
        singleRun: true,
        reporters: ["progress", "coverage"],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            "{webapp,webapp/!(test)}/*.js": ["coverage"]
        },
        coverageReporter: {
            type: "html",
            dir: "webapp/test/coverage/"
        },
        ui5: {
            mode: "html"
            //testpage: "webapp/test/unit/unitTests.qunit.html"
        }
    });
};
