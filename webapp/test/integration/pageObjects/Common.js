/* global sap, jQuery */
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/matchers/Properties"
], function (Opa5, Properties) {
    "use strict";

    function getFrameUrl(hash, urlParameters) {
        hash = hash || "";
        var url = jQuery.sap.getResourcePath("RESOURCE/ROOT/PATH");
        url += "/index.html";

        if (urlParameters) {
            urlParameters = "?" + urlParameters;
        }

        return url + urlParameters + "#" + hash;
    }

    return Opa5.extend("test.integration.pages.Common", {
        constructor: function (config) {
            Opa5.apply(this, arguments);
            this._config = config;
        },

        iLookAtTheScreen: function () {
            return this;
        },

        iStartMyApp: function (options) {
            var urlParameters;

            if (!options) {
                options = {
                    delay: 0
                };
            }

            urlParameters = "serverDelay=" + options.delay;

            if (options.urlParameters) {
                urlParameters += "&" + options.urlParameters;
            }

            this.iStartMyAppInAFrame(getFrameUrl(options.hash, urlParameters));
        },

        controlIsNotVisible: function (viewName, controlId) {
            return this.waitFor({
                viewName: viewName,
                visible: false,
                id: controlId,
                matchers: new Properties({
                    visible: false
                }),
                success: function () {
                    Opa5.assert.ok(true, controlId + " is not visible");
                }
            });
        }
    });
});
