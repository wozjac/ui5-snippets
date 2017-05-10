/* global sap, jQuery */
sap.ui.define([
    "sap/ui/core/util/MockServer"
], function(MockServer) {
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

        this.run = function() {
            //mockServer.simulate();
            mockServer.simulate(options.metadataPath, {
                sMockdataBaseUrl: options.mockDataPath,
                bGenerateMissingMockData: options.generateMissing
            });
            mockServer.start();
        };

        this.getMockServer = function() {
            return mockServer;
        };

        this.getMockData = function() {
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
