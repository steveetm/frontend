/**
 * This is the settings page, where user can set a global filter about providers.
 *
 */
Ext.define('TouchApp.view.Settings', {
    extend: 'Ext.Container',
    xtype: 'Settings',
    requires: ['TouchApp.store.Providers'],
    config: {
        title: 'Global preferences',
        layout: {
            type: 'vbox'

        },
        flex: 1,
        scrollable: false,

        items: [
            {
                xtype: 'list',
                flex: 1,
                mode: 'MULTI',
                itemId: 'providerSelect',
                listeners: {

                    initialize: function () {
                        var me = this;
                        //Load the store with the cached data.
                        var Providers= Ext.JSON.decode(localStorage.getItem('ProvidersCache'));
                        me.getStore().loadData(Providers);
                    }
                },
                store: Ext.create('TouchApp.store.Providers'),
                itemTpl: '{name}'

            }
        ]
    }
});