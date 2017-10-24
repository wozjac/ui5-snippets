/* global sap */
sap.ui.define([
    "RESOURCE.ROOT/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("RESOURCE.ROOT.controller.App", {
        onInit: function () {
            var viewModel = new JSONModel({
                busy: true,
                delay: 0
            });

            this.setModel(viewModel, "appView");
            this.attachBusyIndicatorEvents();
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

        attachBusyIndicatorEvents: function () {
            var viewModel = this.getView().getModel("appView");
            var model = this.getOwnerComponent().getModel();

            model.metadataLoaded().then(function () {
                viewModel.setProperty("/busy", false);
            });

            model.attachBatchRequestSent(function () {
                viewModel.setProperty("/busy", true);
            });

            model.attachBatchRequestCompleted(function () {
                viewModel.setProperty("/busy", false);
            });

            model.attachRequestSent(function () {
                viewModel.setProperty("/busy", true);
            });

            model.attachRequestCompleted(function () {
                viewModel.setProperty("/busy", false);
            });
        }
    });
});
