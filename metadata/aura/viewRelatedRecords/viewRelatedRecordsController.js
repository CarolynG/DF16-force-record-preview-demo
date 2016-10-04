({
	init : function(cmp, event, helper) {
		helper.loadRelatedRecordIds(cmp, cmp.get("v.recordId"));
	},

    reloadRelatedRecords : function(cmp, event, helper) {
        helper.loadRelatedRecordIds(cmp, cmp.get("v.recordId"));
    }
})