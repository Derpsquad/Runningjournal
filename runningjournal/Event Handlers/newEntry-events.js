if (Meteor.isClient) {
    Template.newEntry.events({
        "submit .new-entry": function(event) {     
            
                var value = event.target.text.value;

                if (isNaN(value)) {
                    Session.set("invalidInput", true);
                }
                else if (value === "") {
                    Session.set("invalidInput", true);
                }   
                else {
                    Session.set("invalidInput", false);
                    var valueMi;
                    var valueKm;

                    var units = Session.get("units");

                    if (units === "kilometers") {
                        valueKm = value;
                        valueMi = value*0.621;
                    }
                    else {
                        valueMi = value;
                        valueKm = 1.61*value;
                    }

                    var createdAt = new Date();

                    Entries.insert({
                        valueMi: valueMi,
                        valueKm: valueKm,
                        displayDate: readableDate(),
                        createdAt: createdAt,
                        week: createdAt.getWeek(),
                        month: createdAt.getMonth(),
                        owner: Meteor.userId()
                    });



                    event.target.text.value = "";
                    Session.set("addEntry", false);
                }
            
                return false;
        },
            
        "click #back-button": function(event) {
                Session.set("addEntry", false);
                Session.set("invalidInput", false);
        },
        "click #submit-entry": function(event) {
            $(".new-entry").submit();
        }
        
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