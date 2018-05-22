Ext.define('TouchApp.model.Provider', {
    extend: 'Ext.data.Model',
    config: {
        proxy: {
            type: 'ajax',
            url: 'http://10.10.0.251:28888/providers.json',
        },

        fields: [
            { name: 'idProvider', type: 'number' },
            { name: 'name', type: 'text' }

        ]
    }
});
