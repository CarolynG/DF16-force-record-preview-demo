({
	showModal : function(component, event, helper) {
		$A.util.addClass(component.find("modal"), "slds-fade-in-open");
		$A.util.addClass(component.find("backdrop"), " slds-backdrop--open");
	},
    
	hideModal : function(component, event, helper) {
		$A.util.removeClass(component.find("modal"), "slds-fade-in-open");
		$A.util.removeClass(component.find("backdrop"), "slds-backdrop--open");
	},

    handleRecordSave : function(cmp, event, helper) {
        //hide modal
        $A.util.removeClass(cmp.find("modal"), "slds-fade-in-open");
        $A.util.removeClass(cmp.find("backdrop"), "slds-backdrop--open");
        
        //reload related records
        var relatedRecsCmp = cmp.find("viewRelRec");
        relatedRecsCmp.reloadRelatedRecords();
    },

    navigateToAllAppointments : function(cmp, event, helper) {
        var homeEvent = $A.get("e.force:navigateToObjectHome");
        homeEvent.setParams({
            "scope": "Appointment__c"
        });
        homeEvent.fire();
    }
})