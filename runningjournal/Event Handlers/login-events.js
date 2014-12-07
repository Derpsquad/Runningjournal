if (Meteor.isClient) {
    
    Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var user = t.find('#login-user').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(user, password, function(err){
        if (err) {
            Session.set("loginFailed", true);
            console.log(Session.get("loginFailed"));
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
        }
        else {
            Session.set("loginFailed", false);
        }
          // The user has been logged in.
      });
        Session.set("loginFailed", false);
         return false; 
      }
    });
}