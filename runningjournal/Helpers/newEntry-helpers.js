if (Meteor.isClient) {
    Template.newEntry.helpers({
        units: function() {
            if (Session.get("units")) {
                return Session.get("units");
            }
            else {
                return "miles";
            }
        },
        invalidInput: function() {
            if (Session.get("invalidInput")) {
                return true;
            }
            else {
                return false;
            }
        
        },
    });
}