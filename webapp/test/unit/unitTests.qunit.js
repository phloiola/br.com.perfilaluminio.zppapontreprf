/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"brcomperfilaluminio/zpp_apont_reprf/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
