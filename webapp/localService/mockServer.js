/* global sap, jQuery */
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";

    return function MyMockServer(options) {
        if (!options.rootUri) {
            throw new Error("rootUri not set");
        }

        if (options.metadataPath === undefined) {
            options.metadataPath = jQuery.sap.getModulePath(options.resourceRoot) + "/localService/metadata.xml";
        } else {
            options.metadataPath = jQuery.sap.getModulePath(options.resourceRoot) + options.metadataPath;
        }

        if (options.mockDataPath === undefined) {
            options.mockDataPath = jQuery.sap.getModulePath(options.resourceRoot) + "/localService/mockData";
        } else {
            options.mockDataPath = jQuery.sap.getModulePath(options.resourceRoot) + options.mockDataPath;
        }

        if (options.generateMissing === undefined) {
            options.generateMissing = true;
        }

        var mockServer = new MockServer({
            rootUri: options.rootUri
        });

        this.simulate = function () {
            mockServer.simulate(options.metadataPath, {
                sMockdataBaseUrl: options.mockDataPath,
                bGenerateMissingMockData: options.generateMissing
            });
        };

        this.run = function () {
            mockServer.start();
        };

        this.getMockServer = function () {
            return mockServer;
        };

        this.adjustCalls = function () {
            /* Error response
            var requests = this.getMockServer().getRequests();

            requests.forEach(function (request) {
                if (request.path.toString().indexOf("ENTITY") !== -1 &&
                    request.method === "GET") {
                    request.response = function (xhr) {
                        var headers = {
                            "Content-Type": "application/xml;charset=utf-8",
                            DataServiceVersion: "1.0"
                        };

                        var message = '<?xml version="1.0" encoding="utf-8"?><error xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"><code>/IWFND/CM_CONSUMER/101</code><message xml:lang="en">ERROR MESSAGE</message><innererror><application><component_id/><service_namespace>/SAP/</service_namespace><service_id>SERVICE_ID</service_id><service_version>0001</service_version></application><transactionid>E2AE7A83DFD94CABA30676BB51315815</transactionid><timestamp>20181210225525.4356360</timestamp><Error_Resolution><SAP_Transaction>For backend administrators: run transaction /IWFND/ERROR_LOG on SAP Gateway hub system and search for entries with the timestamp above for more details</SAP_Transaction><SAP_Note>See SAP Note 1797736 for error analysis (https://service.sap.com/sap/support/notes/1797736)</SAP_Note></Error_Resolution><errordetails/></innererror></error>';

                        xhr.respond(400, headers, message);
                    };
                }
            });
            */
        };

        this.getMockData = function () {
            var metadata = mockServer._loadMetadata(options.metadataPath);

            if (!metadata) {
                return null;
            }

            // here we need to analyse the EDMX and identify the entity sets
            var entitySets = mockServer._findEntitySets(metadata);
            mockServer._findEntityTypes(metadata);
            mockServer._generateMockdata(entitySets, metadata);

            return mockServer._oMockdata;
        };
    };
});
