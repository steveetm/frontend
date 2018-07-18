/**
*
*/
Ext.define('TouchApp.store.Departures', {
    extend: 'Ext.data.Store',
    requires: ['TouchApp.model.Departure'],
    config: {
        model: 'TouchApp.model.Departure',
        sorters: 'time',
       /* grouper: {
            groupFn: function(record) {
                return record.get('time').slice(0,2)+":00";
            }
        }*/
    }
});
