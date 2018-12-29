/* global QUnit, sap, window */
QUnit.config.autostart = false;

//latency problem workaround
function checkStart() {
    "use strict";

    if (!window["sap-ui-config"] || !window["sap-ui-config"].libs || !sap) {
        setTimeout(checkStart, 500);
        return;
    }

    var modules = window["sap-ui-config"].libs.replace(/sap./g, "").replace(/\s/g, "").split(",");

    for (var i = 0, iLength = modules.length; i < iLength; i++) {
        if ((modules[i].indexOf(".") !== -1 &&
                !sap[modules[i].split(".")[0]]) ||
            (modules[i].indexOf(".") === -1 &&
                !sap[modules[i]])) {

            setTimeout(checkStart, 500);

            return;
        }
    }

    QUnit.load();
    QUnit.start();
}

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["test/integration/journeys/allJourneys"], function () {
        checkStart();
    });
});
