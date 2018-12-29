/* global jQuery, QUnit, sap */
jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.define([
    "sap/ui/test/Opa5",
    "test/integration/pageObjects/Common",
    "test/integration/pageObjects/PAGE_OBJECT"
], function (Opa5, Common) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Common(),
        viewNamespace: "VIEW_NAMESPACE."
    });

    sap.ui.require([
        "test/integration/journeys/JOURNEY1"
    ], function () {
        QUnit.start();
    });
});
