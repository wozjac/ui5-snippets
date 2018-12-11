/* global sap, jQuery, document */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "RESOURCE_ROOT/js/model/modelFactory",
    "RESOURCE_ROOT/js/ErrorHandler"
], function (UIComponent, Device, modelFactory, ErrorHandler) {
    "use strict";

    return UIComponent.extend("RESOURCE_ROOT.Component", {
        metadata: {
            manifest: "json"
        },

        contentDensityClass: null,

        init: function () {
            this._initModels();
            this.appModel = this.getModel("App");
            this.appModel.setProperty("/appBusy", true);

            UIComponent.prototype.init.apply(this, arguments);
            this.errorHandler = new ErrorHandler(this, this.getModel());
            this.getRouter().initialize(); //optionally _initUser() to get backend user data upfront
            this.appModel.setProperty("/appBusy", false);
        },

        destroy: function () {
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        getContentDensityClass: function () {
            if (this.contentDensityClass === null) {
                this._recognizeContentDensityClass();
            }
            return this.contentDensityClass;
        },

        _initModels: function () {
            this.setModel(modelFactory.createDeviceModel(), "Device");

            var appModel = modelFactory.createAppModel();
            this.setModel(appModel, "App");

            var odataModel = this.getModel();
            this._attachBusyIndicatorEvents(odataModel, appModel);
        },

        _initUser: function () {
            var that = this;
            var odataModel = this.getModel();
            var userSetPath = "/USER_PATH('')";
            this.appModel.setProperty("/appBusy", true);

            odataModel.read(userSetPath, {
                success: function (userInfo) {
                    that.getModel("App").setProperty("/user", userInfo);
                    that.getRouter().initialize();
                    that.appModel.setProperty("/appBusy", false);
                },
                error: function (error) {
                    that.appModel.setProperty("/appBusy", false);
                    jQuery.sap.log.error(error);
                }
            });
        },

        _attachBusyIndicatorEvents: function (odataModel, appModel) {
            odataModel.metadataLoaded().then(function () {
                appModel.setProperty("/appBusy", false);
            });

            odataModel.attachBatchRequestSent(function () {
                appModel.setProperty("/appBusy", true);
            });

            odataModel.attachBatchRequestCompleted(function () {
                appModel.setProperty("/appBusy", false);
            });

            odataModel.attachRequestSent(function () {
                appModel.setProperty("/appBusy", true);
            });

            odataModel.attachRequestCompleted(function () {
                appModel.setProperty("/appBusy", false);
            });
        },

        _recognizeContentDensityClass: function () {
            // check whether FLP has already set the content density class; do nothing in this case
            if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
                this.contentDensityClass = "";
            } else if (!Device.support.touch) {
                this.contentDensityClass = "sapUiSizeCompact";
            } else {
                /*
                "cozy" in case of touch support; default for most sap.m controls,
                but needed for desktop-first controls like sap.ui.table.Table
                */
                this.contentDensityClass = "sapUiSizeCozy";
            }
        }
    });
});
