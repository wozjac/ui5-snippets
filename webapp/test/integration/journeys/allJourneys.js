/* global QUnit, sap */
QUnit.config.autostart = false;

sap.ui.define([
    "sap/ui/test/Opa5",
    "test/integration/pageObjects/Common",
    "test/integration/pageObjects/PAGE_OBJECT",
    "test/integration/journeys/JOURNEY"
], function (Opa5, Common) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Common(),
        viewNamespace: "VIEW.NAMESPACE.",
        autoWait: true
    });
});
