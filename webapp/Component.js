/* global sap, jQuery, document */
sap.ui.define([
    "sap/ui/core/UIComponent",
	"sap/ui/Device",
    "RESOURCE_ROOT/model/modelFactory"
], function (UIComponent, Device, modelFactory) {
    "use strict";

    return UIComponent.extend("RESOURCE_ROOT.Component", {
        metadata: {
            manifest: "json"
        },

        contentDensityClass: null,

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(modelFactory.createDeviceModel(), "device");
            this.getRouter().initialize();
        },

        destroy: function () {
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        getContentDensityClass: function () {
            if (this.contentDensityClass === null) {
                this.recognizeContentDensityClass();
            }
            return this.contentDensityClass;
        },

        recognizeContentDensityClass: function () {
            // check whether FLP has already set the content density class; do nothing in this case
            if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
                this.contentDensityClass = "";
            } else if (!Device.support.touch) {
                this.contentDensityClass = "sapUiSizeCompact";
            } else {
                // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                this.contentDensityClass = "sapUiSizeCozy";
            }
        }
    });
});
