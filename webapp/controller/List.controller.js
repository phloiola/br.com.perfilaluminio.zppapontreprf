sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    let vm = null;

    return Controller.extend("br.com.perfilaluminio.zppapontreprf.controller.List", {
        onInit: function () {
            vm = this;
            vm.oView = vm.getView();
            vm.oModel = new sap.ui.model.odata.ODataModel(vm.getOwnerComponent().getModel().sServiceUrl, false);

            // vm.oBusyDialog = new BusyDialog();

            // vm.oBusyDialog.open();

            vm._oModel = this.getOwnerComponent().getModel();
            vm._oModel.setDefaultCountMode("Inline");
            vm.getView().setModel(this._oModel);

        },

        onBeforeRebindTable: function (oEvent) {
            // let oTable = oEvent.getSource();
            // let oModel = oTable.getModel();

            // var mBindingParams = oEvent.getParameter("bindingParams");
            // mBindingParams.parameters["expand"] = "OP";
        }
    });
});
