module.exports = function (config) {
    config.set({
        frameworks: ["ui5"],
        browsers: ["Chrome"],
        /* or
        browsers: ['ChromeHeadless'],
		singleRun: true
        */

        /* if UI5 tooling not used, uncomment
                ui5: {
                    url: "https://openui5.hana.ondemand.com"
                }
        */
    });
};
