if (Meteor.isClient) {

    Template.login.helpers({
        
        loginFailed: function() {
            if (Session.get("loginFailed")) {
                console.log("here");
                console.log(Session.get("loginFailed"));
                return true;
            }
            else {
                console.log("here");
                return false;
            }
        },
    });
    
}