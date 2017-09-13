/**
 * This is our main view, where a tabpanel holds all of the components.
 *
 */

Ext.define('TouchApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.carousel.Carousel',
        'TouchApp.view.Carousel',
        'TouchApp.view.DepartureList',
        'TouchApp.view.Settings',
        'TouchApp.store.Stations'
    ],
    config: {
        listeners: {
            /**
             * We have to "disable" the last tab, as it only servers as a download button. So, if the clicked tab is the last, prevent the setActiveItem to finish.
             * @event
             */
            beforeactiveitemchange: {
                fn: function (tabpanel, curIdx, oldIdx) {
                    console.log('tabpanelchange');
                    if (curIdx.config.itemId=='downloadData') {
                        TouchApp.app.getApplication().preCacheStores(function() {
                            Ext.Msg.alert('Refreshed every store');
                        },function() {
                            Ext.Msg.alert('Failed to download new data','Please check your network connection');
                        });
                        return false;
                    }
                }

            }
        },

        tabBarPosition: 'bottom',
        items: [{
            title: 'Departures',
            iconCls: 'home',
            cls: 'cards',
            defaults: {
                flex: 1
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                //This is not the best place for this nor the best method. The controller should have a common title generator function.
                title: function() { var postfix = '';

                    var date = new Date()
                    postfix = ' after ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)

                    return 'Departures today, after ' + postfix}()
            }, {
                docked: 'top',
                xtype: 'selectfield',
                fieldLabel: 'Departure',
                itemId: 'stationSelect',
                store: Ext.create('TouchApp.store.Stations'),
                displayField: 'name',
                valueField: 'idStation',
                height: 25
            }, {
                xtype: 'MyCarousel',
                itemId: 'departurecarousel'
            }]
        }, {
            title: 'Settings',
            iconCls: 'settings',
            cls: 'cards',
            defaults: {
                flex: 1
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Settings'
            }, {
                xtype: 'Settings'
            }]
        }, {
            title: 'Download data',
            itemId: 'downloadData',
            iconCls: 'refresh',
            defaults: {
                flex: 1
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            }

        }]
    }
});
