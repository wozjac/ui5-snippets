/* global sap */
sap.ui.define([
    "RESOURCE_ROOT/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("RESOURCE.ROOT.controller.App", {
        onInit: function () {
            var viewModel,
                originalBusyDelay = this.getView().getBusyIndicatorDelay();

            viewModel = new JSONModel({
                busy: true,
                delay: 0
            });
            this.setModel(viewModel, "viewModel");

            var setAppNotBusy = function () {
                viewModel.setProperty("/busy", false);
                viewModel.setProperty("/delay", originalBusyDelay);
            };

            this.getOwnerComponent().getModel().metadataLoaded().then(setAppNotBusy);
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });
});
