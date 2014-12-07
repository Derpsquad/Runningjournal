if (Meteor.isClient) {
    Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var username = t.find('#register-user').value
        , password = t.find('#register-password').value;

        // Trim and validate the input

      Accounts.createUser({username: username, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
          }

        });
      Session.set("signup", false);
      return false;
    }
    });
}