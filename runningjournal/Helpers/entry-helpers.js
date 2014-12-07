if (Meteor.isClient) {
    
    Template.entry.helpers({
        miles: function() {
            if (Session.get("units")) {
                if (Session.get("units") == "kilometers") {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
            
        },
        units: function() {
            if (Session.get("units")) {
                return Session.get("units");
            }
            else {
                return "miles";
            }
        }
    });
}