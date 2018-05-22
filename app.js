/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".
 
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */
/**
 * This is the backbone of our application, entry points, basic initialisation are done there.
 *
 *
 */


Ext.application({
    name: 'TouchApp',
    requires: [
        'Ext.MessageBox',
        'Ext.direct.*',
        'TouchApp.store.Users'
    ],
    views: [
        'Main'
    ],
    stores: [
        'TouchApp.store.Users'
    ],
    controllers: [
        'MainController'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    getRemoteData(url) {
        return new Promise((resolve, reject) => {
            Ext.Ajax.request({
                    url,
                    success: (result) => {
                        if (result.status !== 200) {
                            reject();
                        } else {
                            resolve(Ext.JSON.decode(result.responseText));
                        }
                    }
                }
            );
        })
    },
    /**
     * In this function we load all the data from the server and stores them in localStorage.
     * When every stores loaded, the callback parameter will be called. If any of those fails, them failCallback parameter will be called.
     *
     *
     * @param callback
     * @param failCallback
     */
    preCacheStores: async function (callback, failCallback) {
        var me = this;
        var storesToCache = 3;
        var failure = false;

        if (!failCallback) {
            failCallback = Ext.emptyFn;
        }
        try {
            const stationsResponse = await this.getRemoteData('http://10.10.0.251:28888/stations.json');
            const providersResponse = await this.getRemoteData('http://10.10.0.251:28888/providers.json');
            const StationDeparturesResponse = await this.getRemoteData('http://10.10.0.251:28888/departures.json');
            localStorage.setItem('StationsCache', Ext.JSON.encode(stationsResponse.stations));
            localStorage.setItem('ProvidersCache', Ext.JSON.encode(providersResponse.providers));
            localStorage.setItem('StationDeparturesCache', Ext.JSON.encode(StationDeparturesResponse.departures));
            callback();

        } catch (e) {
            failCallback(e);
        }

    },

    /**
     *
     */
    onDirectApiLoaded: function () {
        var me = this;
        console.log('We are online, normal loading');
        me.preCacheStores(function () {

            Ext.Viewport.add(Ext.create('TouchApp.view.Main'));
        });

    },
    onDirectApiFailed: function () {
        console.log('Falling back to localStorage');
        var remotingApi = Ext.JSON.decode(localStorage.getItem('directApi'));
        if (remotingApi && typeof remotingApi != 'undefined' && typeof remotingApi == "object") {
            //If we have a valid instance of remotingApi in cache, then all of our cache must be populated, so go on loading

            Ext.direct.Manager.addProvider(remotingApi);
            Ext.Viewport.add(Ext.create('TouchApp.view.Main'));
        } else {
            Ext.Msg.alert('Fatal error', 'Sorry, but cannot load the <br/>Ext.direct API from local storage.');
            localStorage.removeItem('directApi');
        }
    },
    init: function () {

    },
    launch: function () {
        //Ext.create('TouchApp.controller.MainController');
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view

        this.onDirectApiLoaded();
    },
    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
