Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {

    Template.body.helpers({
        signup: function() {
            if (Session.get("signup")) {
                return true;
            }
            else {
                return false;
            }
        },
        editSettings: function() {
            if (Session.get("editSettings")) {
                return true;
            }
            else {
                return false;
            }
        },
        addEntry: function() {
            if (Session.get("addEntry")) {
                return true;
            }
            else {
                return false;
            }
        },              
    });
    
    Template.body.events({
        "click #settings-button": function(event) {
            Session.set("editSettings", true);
            Session.set("addEntry", false);
        },
        "click #signout-button": function(event) {
            Meteor.logout();    
        },
        "click .week": function(event) {
            Session.set("display", "week");
        },
        "click .month": function(event) {
            Session.set("display", "month");
        },
        "click .all": function(event) {
            Session.set("display", "all");
        },
        "click #signup-link": function(event) {
            Session.set("signup", true);
            console.log(Session.get("signup"));
        },
        "click #login-link": function(event) {
            Session.set("signup", false);
            console.log(Session.get("signup"));
        },
        "click #add-run": function(event) {
            Session.set("addEntry", true);
            Session.set("editSettings", false);
        },
    });
}

function readableDate() {
    
    var currentDate = new Date();
    
    var month = (currentDate.getMonth() + 1).toString();
    var day = currentDate.getDate().toString();
    var year = currentDate.getFullYear();
    
    var readableDate = month + '/' + day + '/' + year;
    
    return readableDate;
}

Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }