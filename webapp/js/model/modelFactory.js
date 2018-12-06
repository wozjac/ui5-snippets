/* global sap */
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {
        createDeviceModel: function () {
            var model = new JSONModel(Device);
            model.setDefaultBindingMode("OneWay");
            return model;
        },

        createAppModel: function () {
            var model = new JSONModel({
                systemLanguage: sap.ui.getCore().getConfiguration().getLocale().getLanguage().toUpperCase(),
                appBusy: false
            });

            model.setDefaultBindingMode("TwoWay");
            return model;
        }
    };
});
