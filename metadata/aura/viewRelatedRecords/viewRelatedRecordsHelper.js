({
	loadRelatedRecordIds : function(cmp, recordId) {
        var action = cmp.get("c.getRelatedRecordIds");
        if (!action) {
            debugger;
            console.log("error loading related records! No action found.");
        }
        action.setParams({recordId: recordId,
                          entityToQuery: "Appointment__c",
                          relationshipName: "Property__c"});
        //ignore existing action because we anticipate refreshing in demo
        action.setStorable({
            "ignoreExisting": "true"
        });
        action.setCallback(this, $A.getCallback(function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var retVal = response.getReturnValue();
                console.log('Got record ids from server! ' + JSON.stringify(retVal));
                cmp.set('v.recordIds', retVal);
                cmp.set('v.recordIdsLoaded', true);
            } else if (state === "ERROR") {
                var error = response.getError();
                console.log('Got error loading related record ids from server! Errors: ' + JSON.stringify(error));
            } else if (state === "INCOMPLETE") {
                //TODO
            }
        }));
        $A.enqueueAction(action);		
	}
})