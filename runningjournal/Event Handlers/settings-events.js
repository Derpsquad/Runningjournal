if (Meteor.isClient) {
    Template.settings.events({
            "click .miles": function(event) {           //Save the selected units
                Session.set("units", "miles");
            },
            "click .kilometers": function(event) {
                Session.set("units", "kilometers");
            },
            "click #back-button": function(event) {
                Session.set("editSettings", false);
            },
    });
}