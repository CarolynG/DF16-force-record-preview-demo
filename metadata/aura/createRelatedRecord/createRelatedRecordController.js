({
    // Load a blank record template with any default values defined by the org admin
    init : function(cmp, event, helper) {
        helper.getNewRecord(cmp);
    },

    //Called when user clicks 'Create' button
    createAppt : function(cmp, event, helper) {
        //add the time suffix to the datetime value
        var record = cmp.get("v.recordForCreate");
        if (record.Appointment_Date__c) {
            record.Appointment_Date__c = record.Appointment_Date__c + "0Z";
        }

        cmp.find("recordService").saveRecord($A.getCallback(function(saveResult) {
            var state = saveResult.state;
            if (state === "SUCCESS" || state === "DRAFT") {
                var toastEvent = $A.get("e.force:showToast");
                var message = state === "SUCCESS" ? "Created a new appointment." : "Created a pending upload of a new appointment.";
                toastEvent.setParams({
                    "title": "Success!",
                    "message": message
                });
                toastEvent.fire();

                //close the modal
                var closeModalEvent = cmp.getEvent("closeModalEvt").fire();

                //reset the current record with a blank template to create the next appointment
                cmp.set("v.recordLoaded", false);
                helper.getNewRecord(cmp);
            } else if (state === "ERROR") {
                var errorObj = saveResult.error[0];
                if (errorObj.fieldErrors) {
                    if (errorObj.fieldErrors.Appointment_Date__c) {
                        var dateCmp = cmp.find("inputDate");
                        dateCmp.set("v.errors", errorObj.fieldErrors.Appointment_Date__c);
                    }
                    if (errorObj.fieldErrors.Client_Name__c) {
                        var clientCmp = cmp.find("inputClient");
                        clientCmp.set("v.errors", errorObj.fieldErrors.Client_Name__c);
                    }
                }
                console.log("Problem creating new appointment. Error: " + JSON.stringify(errorObj));
            } else if (state === "INCOMPLETE") {
                console.log("No response from server or client is offline.")
            }
        }));
    }

})