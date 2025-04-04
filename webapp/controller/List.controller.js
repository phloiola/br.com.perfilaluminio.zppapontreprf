sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
function (Controller, Filter, FilterOperator) {
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

        },
        onPopoverOrdemProd: function (oEvent) {
                
            // Adquire referencia do campo que o usuário clicou
            let oSource = oEvent.getSource();

            // Adquire dados da linha que foi feito o clique
            let oDataLine = oSource.getBindingContext().getObject();

            // create popover
            if (!vm._pPopover) {
                vm._pPopover = sap.ui.core.Fragment.load({
                    id: vm.getView().getId(),
                    name: "br.com.perfilaluminio.zppapontreprf.view.fragment.PopoverOrdemProd",
                    controller: this
                }).then(function(oPopover){
                    vm.getView().addDependent(oPopover);
                    return oPopover;
                });
            }

            vm._pPopover.then(function(oPopover){
                
                vm.oPopoverOrdemProd = oPopover;

                let sPath =  "/OrdemProducaoSet";
                let aFilters = [];

                    var oFilter = new Filter("Equnr", FilterOperator.EQ, oDataLine.Equnr);
                    aFilters.push(oFilter);
                    oFilter = new Filter("DtProgr", FilterOperator.EQ, new Date( oDataLine.DtProgr ));
                    aFilters.push(oFilter);
                    oFilter = new Filter("Comprimento", FilterOperator.EQ, oDataLine.Comprimento);
                    aFilters.push(oFilter);
                    oFilter = new Filter("Tempera", FilterOperator.EQ, oDataLine.Tempera);
                    aFilters.push(oFilter);

                    oFilter = new Filter("CentroTrab", FilterOperator.EQ, oDataLine.CentroTrab );
                    aFilters.push(oFilter);

                vm.oView.byId("idPopoverOrdemProdTable").bindItems({
                    // path: "MainOData>/OrdemProducaoSet",
                    path: sPath,
                    filters: aFilters,
                    templateShareable: true,
                    template: vm.oView.byId("idPopoverOrdemProdColumnListItem")
                } );

                oPopover.openBy(oSource);
            });

        },
        onClosePopoverOrdemProd: function(oEvent) {
            vm.oPopoverOrdemProd.close();
        }
    });
});
