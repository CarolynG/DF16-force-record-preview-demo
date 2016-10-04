({
	navigateToAppt : function(cmp, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": cmp.get("v.recordId"),
        });
        navEvt.fire();
	}
})