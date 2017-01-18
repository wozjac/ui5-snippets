/* global sap */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("RESOURCE_ROOT.BaseController", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        getModel: function (name) {
            return this.getView().getModel(name);
        },

        setModel: function (model, name) {
            return this.getView().setModel(model, name);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getContentDensityClass: function () {
            return this.getOwnerComponent().getContentDensityClass();
        },

        byId: function (id) {
            return this.getView().byId(id);
        }
    });
});
