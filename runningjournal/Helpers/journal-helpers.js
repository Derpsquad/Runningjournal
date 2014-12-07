if (Meteor.isClient) {
    
    Template.journal.helpers({
            entries: function() {
                if (Session.get("display")) {
                    toDisplay = Session.get("display");
                }
                else {
                    toDisplay = "week";
                }
                if (toDisplay === "all") {
                    
                    fadeInLoad("#entry-list");
                    fadeInLoad("#totalDistance");
                    return Entries.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});        
                }
                else if (toDisplay === "month") {
                    fadeInLoad("#entry-list");
                    fadeInLoad("#totalDistance");
                    return Entries.find({owner: Meteor.userId(), month: new Date().getMonth()}, {sort: {createdAt: -1}});    
                }
                else if (toDisplay === "week") {
                    fadeInLoad("#entry-list");
                    fadeInLoad("#totalDistance");
                    return Entries.find({owner: Meteor.userId(), week: new Date().getWeek()}, {sort: {createdAt: -1}})
                }
            },
            totalDistance: function() {
                var totalDistance = 0;
                if (Session.get("units")) {
                    
                    fadeInLoad("#totalDistance");
                    
                    if (Session.get("units") == "miles") {
                        Entries.find({owner: Meteor.userId()}).forEach(function(entry) {
                            totalDistance += parseInt(entry.valueMi);
                        });
                    }
                    else {
                        $("#totalDistance").css("-webkit-animation", '');
                        if ($("#totalDistance").css("-webkit-animation") == null) {
                        }
                        $("#totalDistance").css("-webkit-animation", 'fadeInLoad 0.5s');
                        Entries.find({owner: Meteor.userId()}).forEach(function(entry) {
                            totalDistance += parseInt(entry.valueKm);
                        });
                    }
                }
                else { //Return total miles if unspecifeid
                    Entries.find({owner: Meteor.userId()}).forEach(function(entry) {
                            totalDistance += parseInt(entry.valueMi);
                        });
                }
                return totalDistance;                                
            },
            units: function() {
                if (Session.get("units")) {
                    fadeInLoad("#entry-list");
                    return Session.get("units");
                }
                else {
                    return "miles";
                }
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

function fadeInLoad(element) {
    $(element).css("-webkit-animation", '');
    
    //Adding this if statement causes the animation to be triggered
    //Without it nothing happens for some reason (leave this in)
    if ($(element).css("-webkit-animation") == null) {
    }
    
    $(element).css("-webkit-animation", 'fadeInLoad 0.5s');
}