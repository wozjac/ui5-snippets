/* global sap */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox"
], function (Object, MessageBox) {
    "use strict";

    return Object.extend("RESOURCE.ROOT.controller.ErrorHandler", {
        resourceBundle: null,
        component: null,
        model: null,
        messageOpen: false,

        constructor: function (component, model) {
            this.resourceBundle = component.getModel("i18n").getResourceBundle();
            this.component = component;
            this.model = model;

            this.model.attachMetadataFailed(this.handleMetadataFailed.bind(this));
            this.model.attachBatchRequestFailed(this.handleRequestError.bind(this));
            this.model.attachRequestFailed(this.handleRequestError.bind(this));
        },

        handleMetadataFailed: function (error) {
            this.showErrorMessageBox(this.getErrorMessage(error));
        },

        handleRequestError: function (error) {
            /* Uncomment in case of configured "bypassed" route */
            //var params = error.getParameters();
            //if (params.response.statusCode !== "404" || params.response.statusCode === 404 && params.response.responseText.indexOf("Cannot POST") === 0) {
            this.showErrorMessageBox(this.getErrorMessage(error));
            //}
        },

        getErrorMessage: function (error) {
            var message;
            if (error.getParameter("response").responseText !== undefined) {
                var responseText = error.getParameter("response").responseText;
                try {
                    message = JSON.parse(responseText).error.message.value;
                } catch (catchedError) {
                    message = responseText;
                }

            } else {
                message = error.getParameter("response").body;
            }

            return message;
        },

        showErrorMessageBox: function (message) {
            MessageBox.error(message, {
                title: ""
            });
        }
    });
});
