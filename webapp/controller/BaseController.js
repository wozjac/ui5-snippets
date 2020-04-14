/* global sap */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("RESOURCE_ROOT.controller.BaseController", {
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

        getById: function (id) {
            return this.getView().byId(id);
        },

        getMessageManager: function () {
            return sap.ui.getCore().getMessageManager();
        },

        getText(key, ...args) {
            return this.getResourceBundle().getText(key, args);
        },

        getTextByKey(key) {
            return this.getResourceBundle().getText(key);
        },

        onNavBack() {
            const previousHash = History.getInstance().getPreviousHash();

            if (previousHash !== undefined) {
                // The history contains a previous entry
                history.go(-1);
            } else {
                // Otherwise we go backwards with a forward history
                this.getRouter().navTo("master", {}, true);
            }
        }
    });
});
