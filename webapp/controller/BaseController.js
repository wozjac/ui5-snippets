/* global sap */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("RESOURCE.ROOT.BaseController", {
        router: null,
        resourceBundle: null,

        getRouter: function () {
            if (!this.router) {
                this.router = UIComponent.getRouterFor(this);
            }
            return this.router;
        },

        getModel: function (name) {
            return this.getView().getModel(name);
        },

        setModel: function (model, name) {
            return this.getView().setModel(model, name);
        },

        getResourceBundle: function () {
            if (!this.resourceBundle) {
                this.resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            }
            return this.resourceBundle;
        },

        getContentDensityClass: function () {
            return this.getOwnerComponent().getContentDensityClass();
        },

        byId: function (id) {
            return this.getView().byId(id);
        },

        getMessageManager: function () {
            return sap.ui.getCore().getMessageManager();
        }
    });
});
