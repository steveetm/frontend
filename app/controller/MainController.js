/**
 * This is our main controller where all of the main functionality lies. It mainly have event listeners.
 */
Ext.define('TouchApp.controller.MainController', {
    extend: 'Ext.app.Controller',

    config: {

        control: {
            'carousel[itemId="departurecarousel"]': {
                'activeitemchange': 'onCarouselActiveItemChange'

            },
            '*[itemId="stationSelect"]': {
                initialize: 'onStationSelectInitialize',
                change: 'onStationSelectChange'
            },
            '*[itemId="providerSelect"]': {
                selectionchange: 'onProvidersSelectionChange',
            },
/*            '*[itemId="downloadData"]': {
                tap: 'onTapDownloadData'
            }
*/
        }
    },
    /**
     * This function called, when a provider selected on the settings page. If the provider not in the {@link TouchApp.controller.MainController#selectedProvider}, then it will be added,
     * of removed if already there.
     *
     * The main functionality of this function to maintain the {@link TouchApp.controller.MainController#selectedProvider}, so we can filter the {@link TouchApp.view.DepartureList} components.
     *
     * @param list
     * @param records
     *
     */
    onProvidersSelectionChange: function (list, records) {
        var me = this;
        idx = me.selectedProviders.indexOf(Number(records[0].data.idProvider));
        if (idx > -1) {
            me.selectedProviders.splice(idx, 1);
        } else {
            me.selectedProviders.push(Number(records[0].data.idProvider));
        }


        var departureLists = Ext.ComponentQuery.query('DepartureList');
        if (2 > -1) {
            departureLists.forEach(function (departureList) {
                Ext.bind(departureList.setupFilters, departureList)();
            });
        }
    },
    onStationSelectInitialize: function (select) {
        console.log('select initialized');
        var Stations = [{
            name: 'List all stations',
            idStation: -1
        }].concat(Ext.JSON.decode(localStorage.getItem('StationsCache')));

        select.getStore().loadData(Stations);

    },
    onStationSelectChange: function (select, newValue) {
        console.log('cahnge happend');
        var departureLists = Ext.ComponentQuery.query('DepartureList');
        if (newValue > -1) {
            departureLists.forEach(function (departureList) {
                departureList.getStore().clearFilter();
                departureList.getStore().filter([{
                    'id': 'Stations_idStationDeparture',
                    property: 'Stations_idStationDeparture',
                    value: newValue
                }]);
            });
        } else {
            departureLists.forEach(function (departureList) {
                departureList.getStore().clearFilter();
            });
        }
    },

    onCarouselActiveItemChange: function (carousel, value, oldValue, eOpts) {
        var me = this;
        var postfix = '';
        var msg= value.title;
        if (carousel.getActiveIndex() == 0) {
            var date = new Date()
            postfix = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)

        }

        carousel.up('tabpanel').down('titlebar').setTitle(msg + postfix);
    },
    onCarouselActiveItemChangeactive: function (scope, value, oldValue, eOpts) {
        console.log('activated carousel');
    },
    initConfig: function () {
        var me = this;
        me.selectedProviders = [];
        me.setTime();
        setInterval(function() {
            Ext.bind(me.setTime,me)();
        },1000*60);
        me.callParent(arguments);

    },
    setTime: function() {
        var me = this;
        var date = new Date()
        me.currentTime = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    },

    constructor: function () {
        console.log('constructor ok');
        this.callParent(arguments);
    }
})