({
    onStepChange : function(component, event) {
        var property = component.get("v.record");
        if (property) {
            property.Status__c = event.getParam("value");
            component.find("recordService").saveRecord();
        }
    },
    
    refreshStep : function(component, event) {
        component.find("recordService").reloadRecord();
    }

 })