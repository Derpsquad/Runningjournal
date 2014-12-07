if (Meteor.isClient) {
 
    Template.settings.helpers({
        isMetric: function() {
            if (Session.get("units") === "kilometers") {
                return true;
            }
            else {
                return false;
            }
        }
    });
    
}