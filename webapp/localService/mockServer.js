/* global sap, jQuery */
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    var mockServer;

    var options = {
        rootUri: "/SERVICE_URI/",
        metadataPath: jQuery.sap.getModulePath("RESOURCE_ROOT") + "/localService/metadata.xml",
        mockDataPath: jQuery.sap.getModulePath("RESOURCE_ROOT") + "/localService/mockData",
        generateMissing: true
    };

    return {
        init: function () {
            mockServer = new MockServer({
                rootUri: options.rootUri
            });
            mockServer.simulate(options.metadataPath);
            //mockServer.simulate(options.metadataPath, {
            //    sMockdataBaseUrl: options.mockDataPath,
            //    bGenerateMissingMockData: options.generateMissing
            //});
            mockServer.start();
        },

        getMockServer: function () {
            return mockServer;
        }
    };
});
