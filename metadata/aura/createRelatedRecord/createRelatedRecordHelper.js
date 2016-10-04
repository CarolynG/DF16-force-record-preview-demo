({
    //Called on component initialization and after successful save
    //Loads a blank record template with default values for the Appointment__c entity
	getNewRecord : function(cmp) {
		cmp.find("recordService").getNewRecord(
            "Appointment__c",     //entity api name for the record being created
            null,                 //record type id for the record being created (my entity doesn't have RTs, so I'll pass null)
            null,                 //default field values (I don't need any so I'll pass null)
            false,                //boolean option to skip cached record template (I don't expect these to change so I'll pass false)
            $A.getCallback(function(){ // callback will run after record template is retrieved
                var record = cmp.get("v.recordForCreate");
                var error = cmp.get("v.recordLoadError");
                if (error) {
                    console.log("Error loading record for create: " + JSON.stringify(error));
                } else if (record) {
                    //trim the default datetime data to pass to input
                    var defaultDate = record.Appointment_Date__c;
                    if (defaultDate) {
                        record.Appointment_Date__c = defaultDate.substring(0,22); 
                    }
                    record.Property__c = cmp.get("v.recordId"); 

                    //set the flag that triggers render
                    cmp.set("v.recordLoaded", true);
                }
            }));
	}
})