/* global QUnit, sap */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["test/unit/allTests"], function () {
        QUnit.start();
    });
});
