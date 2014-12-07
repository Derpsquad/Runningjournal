(function(){Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {

    Template.body.helpers({
        entries: function() {
            if (Session.get("display")) {
                toDisplay = Session.get("display");
            }
            else {
                toDisplay = "week";
            }
            if (toDisplay === "all") {
                collection = Entries.find({}, {sort: {createdAt: -1}});               
                return collection;
            }
            else if (toDisplay === "month") {
                return Entries.find({month: new Date().getMonth()}, {sort: {createdAt: -1}});    
            }
            else if (toDisplay === "week") {
                return Entries.find({week: new Date().getWeek()}, {sort: {createdAt: -1}})
            }
        },
        totalDistance: function() {
            var totalDistance = 0;
            if (Session.get("units")) {
                if (Session.get("units") == "miles") {
                    Entries.find({}).forEach(function(entry) {
                        totalDistance += parseInt(entry.valueMi);
                    });
                }
                else {
                    Entries.find({}).forEach(function(entry) {
                        totalDistance += parseInt(entry.valueKm);
                    });
                }
            }
            else { //Return miles if unspecifeid
                Entries.find({}).forEach(function(entry) {
                        totalDistance += parseInt(entry.valueMi);
                    });
            }
            return totalDistance;                                
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
    
    Template.body.events({
        "submit .new-entry": function(event) {
            
            var value = event.target.text.value;
            var valueMi;
            var valueKm;
            
            var units = event.target.units.value;
            
            if (units === "miles") {
                valueMi = value;
                valueKm = 1.61*value;
            }
            else if (units === "kilometers") {
                valueKm = value;
                valueMi = value*0.621;
            }
            
            var createdAt = new Date();
            
            Entries.insert({
                valueMi: valueMi,
                valueKm: valueKm,
                displayDate: readableDate(),
                createdAt: createdAt,
                week: createdAt.getWeek(),
                month: createdAt.getMonth()
            });
            
            event.target.text.value = "";
            
            return false;
        },
        "click #miles": function(event) {           //Save the selected units
            Session.set("units", "miles");
        },
        "click #kilometers": function(event) {
            Session.set("units", "kilometers");
        },
        "click .week": function(event) {
            console.log("Got here");
            Session.set("display", "week");
        },
        "click .month": function(event) {
            console.log("Got here");
            Session.set("display", "month");
        },
        "click .all": function(event) {
            console.log("Got here");
            Session.set("display", "all");
        }
    });
    
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
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

})();
