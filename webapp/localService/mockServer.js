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

    (function init() {
        mockServer = new MockServer({
            rootUri: options.rootUri
        });
    })();

    return {
        run: function () {
            mockServer.simulate(options.metadataPath);
            //mockServer.simulate(options.metadataPath, {
            //    sMockdataBaseUrl: options.mockDataPath,
            //    bGenerateMissingMockData: options.generateMissing
            //});
            mockServer.start();
        },

        getMockServer: function () {
            return mockServer;
        },

        getMockData: function () {
            var metadata = mockServer._loadMetadata(options.metadataPath);

            if (!metadata) {
                return null;
            }

            // here we need to analyse the EDMX and identify the entity sets
            var entitySets = mockServer._findEntitySets(metadata);
            mockServer._findEntityTypes(metadata);
            mockServer._generateMockdata(entitySets, metadata);

            return mockServer._oMockdata;
        }
    };
});
