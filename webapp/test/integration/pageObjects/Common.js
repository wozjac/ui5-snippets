/* global sap, jQuery */
sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    function getFrameUrl(hash, urlParameters) {
        hash = hash || "";
        var url = jQuery.sap.getResourcePath("RESOURCE_ROOT");
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

            options = options || {
                delay: 0
            };

            urlParameters = "serverDelay=" + options.delay;
            this.iStartMyAppInAFrame(getFrameUrl(options.hash, urlParameters));
        }
    });
});
