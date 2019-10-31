/* global parent, location, window */
// eslint-disable-next-line sap-no-global-define
window.suite = function () {
    "use strict";
    /* eslint-disable new-cap */
    var suite = new parent.jsUnitTestSuite(),
        contextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    suite.addTestPage(contextPath + "unit/unitTests.qunit.html");
    //oSuite.addTestPage(sContextPath + "integration/opaTests.qunit.html");

    return suite;
};
