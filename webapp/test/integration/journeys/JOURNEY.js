/* global sap, QUnit, opaTest */
sap.ui.require(["sap/ui/test/opaQunit"], function () {
    "use strict";

    QUnit.module("MODULE");

    opaTest("SHOULD PASS", function (Given, When, Then) {
        Given.iStartMyApp(
            //{
            //    hash: "TARGET"
            //}
        );
        When.onTheRequestDetailPage.iLookAtTheScreen();
        Then.iTeardownMyAppFrame();
    });
});
