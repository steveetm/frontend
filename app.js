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
    /**
     * In this function we load all the data from the server and stores them in localStorage.
     * When every stores loaded, the callback parameter will be called. If any of those fails, them failCallback parameter will be called.
     *
     *
     * @param callback
     * @param failCallback
     */
    preCacheStores: function(callback,failCallback) {
        var me = this;
        var storesToCache=3;
        var failure = false;

        if (!failCallback) {
            failCallback = Ext.emptyFn;
        }
        Controller_StationDepartures.getDepartures(function (result,response,success) {
            if (!success) {
                failure = true;
            } else {
                localStorage.setItem('StationDeparturesCache',Ext.JSON.encode(result));
            }
            storesToCache--;
        });
        Controller_Stations.getStations(function (result,response,success) {
            if (!success) {
                failure = true;
            } else {
                localStorage.setItem('StationsCache',Ext.JSON.encode(result));
            }
            storesToCache--;
        });
        Controller_Providers.getProviders(function (result,response,success) {

            if (!success) {
                failure = true;
            } else {
                localStorage.setItem('ProvidersCache',Ext.JSON.encode(result));
            }
            storesToCache--;
        });


        var storeChecker=setInterval(function() {
            if (storesToCache == 0) {
                //<debug>
                console.debug('All stores loaded and saved to the cache');
                //</debug>
                if (!failure) {
                    callback();
                } else {
                    failCallback();
                }
                clearInterval(storeChecker);
            }
        },250);

    },

    /**
     *
     */
    onDirectApiLoaded: function () {
        var me = this;
        console.log('We are online, normal loading');
        Ext.app.REMOTING_API.enableBuffer = false;
        Ext.app.REMOTING_API.maxRetries = 0;
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
        localStorage.setItem('directApi', Ext.JSON.encode(Ext.app.REMOTING_API));
        me.preCacheStores(function() {

            Ext.Viewport.add(Ext.create('TouchApp.view.Main'));
        });

    },
    onDirectApiFailed: function () {
        console.log('Falling back to localStorage');
        var remotingApi = Ext.JSON.decode(localStorage.getItem('directApi'));
        if (remotingApi && typeof remotingApi!='undefined' && typeof remotingApi=="object") {
            //If we have a valid instance of remotingApi in cache, then all of our cache must be populated, so go on loading

            Ext.direct.Manager.addProvider(remotingApi);
            Ext.Viewport.add(Ext.create('TouchApp.view.Main'));
        } else {
            Ext.Msg.alert('Fatal error', 'Sorry, but cannot load the <br/>Ext.direct API from local storage.');
            localStorage.removeItem('directApi');
        }
    },
    init: function() {

    },
    launch: function () {
        var me = this;
        //Ext.create('TouchApp.controller.MainController');
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view

        Ext.onReady(function () {
            Ext.Loader.loadScript(
                    {url:'http://steveetm.hu/backend/ext-direct/getConfig',
                    onLoad:Ext.bind(me.onDirectApiLoaded, me),
                    onError:Ext.bind(me.onDirectApiFailed, me)
                    });
        });
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
