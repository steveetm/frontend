Ext.define('TouchApp.model.Station', {
    extend: 'Ext.data.Model',
    config: {
        proxy: {
            type: 'ajax',
            url: 'http://10.10.0.251:28888/stations.json',
        },

        fields: [
            { name: 'idStation', type: 'number' },
            { name: 'name', type: 'text' }

        ]
    }
});
