define([
    'Underscore',
    'jQuery'
], function (_, $) {
    'use strict';

    return {
        subscribeCollectionEvents: function (collection, contentView) {
            collection.bind('showmore', contentView.showMoreContent, contentView);
            collection.bind('showmoreAlphabet', contentView.showMoreAlphabet, contentView);
            collection.bind('fetchFinished', contentView.setPagination, contentView);
            collection.bind('errorPagination', function (err) {
                App.render({
                    type   : 'error',
                    message: err.statusText || 'Some Error.'
                });
            });

            $(document).on('click', function (e) {
                if (contentView && typeof (contentView.hide) === 'function') {
                    contentView.hide(e);
                }
            });
        },

        subscribeTopBarEvents: function (topBarView, contentView) {
            topBarView.bind('createEvent', contentView.createItem, contentView);
            topBarView.bind('editEvent', contentView.editItem, contentView);
            topBarView.bind('deleteEvent', contentView.deleteItems, contentView);
            topBarView.bind('saveEvent', contentView.saveItem, contentView);
            topBarView.bind('exportToCsv', contentView.exportToCsv, contentView);
            topBarView.bind('exportToXlsx', contentView.exportToXlsx, contentView);
            topBarView.bind('importEvent', contentView.importFiles, contentView);
            topBarView.bind('copyEvent', contentView.copy, contentView);
            topBarView.bind('generateEvent', contentView.generate, contentView);
            topBarView.bind('generateInvoice', contentView.generateInvoice, contentView);
            topBarView.bind('copyRow', contentView.copyRow, contentView);
            topBarView.bind('pay', contentView.newPayment, contentView);
            topBarView.bind('changeDateRange', contentView.changeDateRange, contentView);
            topBarView.bind('recountAllEvent', contentView.recountAll, contentView);
            topBarView.bind('moveToEdit', contentView.moveToEdit, contentView);
            topBarView.bind('saveAllEvent', contentView.saveDashboard, contentView);
            topBarView.bind('removeAllEvent', contentView.removeAllCharts, contentView);
        },

        subscribeCustomChartEvents: function(chartView, gridView){
            chartView.bind('actionWithChart', gridView.markEngagedCells, gridView)
        }
    };
});