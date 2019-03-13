
/**
 *
 * This class manages the timetables
 */
Ext.define('TouchApp.view.DepartureList', {
    extend: 'Ext.dataview.List',
    requires: ['Ext.dataview.List'],
    xtype: 'DepartureList',
    alias: 'DepartureList',

    initialize: function () {
        var me = this;
        me.setStore(Ext.create('TouchApp.store.Departures'));
        me.callParent(arguments);
        me.setDisableSelection(true);
        me.setupFilters();
        // me.getStore().load();
    },
    /**
     * This is where we generate the final data for the component.
     * Basically it reads the localStorage, which guaranteed to always hold the most recent version of the data, what we can
     * have. After that, it pairs up the ids with names, storing them for faster access in the original data. Finally, it applies the
     * necessary filters, which is component and user input dependant.
     *
     */
    setupFilters: function () {
        var me = this;
        // Lest load the cache, which is populated also when we are online. So always good data here
        var Providers = Ext.JSON.decode(localStorage.getItem('ProvidersCache'));
        var Stations = Ext.JSON.decode(localStorage.getItem('StationsCache'));
        var Departures = Ext.JSON.decode(localStorage.getItem('StationDeparturesCache'));

        //Lets do the id=> names mapping.
        Departures.forEach(function (departure, idx, array) {
            //Map the provider ids
            array[idx].providerName = Providers.filter(function (o, k) {
                if (o.idProvider == departure.Providers_idProvider) {
                    return o
                }
            })[0].name;
            //Map the departure ids

            array[idx].stationName = Stations.filter(function (o, k) {
                if (o.idStation == departure.Stations_idStationDeparture) {
                    return o
                }
            })[0].name;
            //Map the destination ids

            array[idx].stationNameTo = Stations.filter(function (o, k) {
                if (o.idStation == departure.Stations_idStationArrive) {
                    return o
                }
            })[0].name;
        });

        //Lets check if the user want a global filter about providers.
        var selectedProviders = TouchApp.app.getController('TouchApp.controller.MainController').selectedProviders;

        //This is where the component own list of timetable finally constructed
        var filteredDepartures = Departures.filter(function (item, key) {

            if (item.dow == me.config.dow) {
                //Are there any providers to filter to?
                if (selectedProviders.length > 0) {
                    //Lets check if the list
                    if (selectedProviders.indexOf(Number(item.Providers_idProvider)) > -1) {
                        return item;
                    }
                } else {
                    return item;
                }
            }
            //If the component dow=0, then its special, have to merge with current days timetables.
            if (me.config.dow == 0) {
                var d = new Date();
                var n = d.getDay();
                if (n == item.dow || item.dow == 0) {
                    if (selectedProviders.length > 0) {
                        if (selectedProviders.indexOf(Number(item.Providers_idProvider)) > -1) {
                            return item;
                        }
                    } else {
                        return item;
                    }
                }

            }

        });

        me.getStore().setData(filteredDepartures);


    },
    filterByAfterTime: function (time) {
        var me = this;
        me.getStore().clearFilters();

    },

        store: null, //Each departureList must have its own store instance
        itemTpl: new Ext.XTemplate('' +
        '<tpl if="this.getTime(time,dow)">' +
            '<div class="inactive ">' +
        '<tpl else>' +
            '<div class="active">' +
        '</tpl>' +
        //'At {time} , {providerName} \'s ferry will departure from <b>{stationName}</b> to <b>{stationNameTo}</b></div>', {
        '<div class="dep-time">{time}</div>' +
        '<div class="dep-datas">' + 
            '<div class="provider">{providerName}\'s ferry</div>' +
            '<div><b>{stationName}</b> to <b>{stationNameTo}</b></div>' +
        '</div>' +
        '</div>', {
            getTime: function (time,dow) {
                return ((TouchApp.app.getController('TouchApp.controller.MainController').currentTime > time));
            }
        }),

        disableSelection: true,
        mode: 'SIMPLE'
});
