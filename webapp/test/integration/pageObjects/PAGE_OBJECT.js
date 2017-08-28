/* global sap, ok */
sap.ui.require(["sap/ui/test/Opa5", "test/integration/pageObjects/Common"],
    function (Opa5, Common) {
        "use strict";

        Opa5.createPageObjects({
            ON_THE_PAGE: {
                baseClass: Common,

                actions: {},

                assertions: {
                    I_SEE_ITS_WORKINGS: function () {
                        return this.waitFor({
                            viewName: "VIEW_NAME",
                            id: "ID",
                            success: function () {
                                ok(true, "OK");
                            }
                        });
                    }
                }
            }
        });
    });
