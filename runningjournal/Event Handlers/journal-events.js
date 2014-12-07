if (Meteor.isClient) {
    Template.journal.events({
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