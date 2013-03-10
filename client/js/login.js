Template.login.usernameAcquired = function() {
    return Session.get('username');
};

Template.login.passwordAcquired = function() {
    return Session.get('password');
};

Template.login.loginLabel = function() {
    return Session.get("loginOrReg");
};

Template.login.events = {
    'keypress': function (event) {
        if (event.keyCode == 13) {
            if (!Template.login.usernameAcquired()) {
                Session.set("username", event.currentTarget.value);
                event.currentTarget.value = "";
            }
            else {
                if(Session.equals("loginOrReg", "Login: ")) {                    
                    Meteor.loginWithPassword(Session.get('username'), event.currentTarget.value);
                } 
                else if (Session.equals("loginOrReg", "Register: ")) {
                    Accounts.createUser({username: Session.get("username"), password: event.currentTarget.value});
                    session.set("loginOrReg", "Login: ");
                }
                event.currentTarget.value = "";
                Session.set('username', '');
                Meteor.flush();
            }
        }
    },
    'click .registerToggle': function (event) {
        if (Session.get("loginOrReg") === "Login: ") {
            Session.set("loginOrReg", "Register: ");
        } else {
            Session.set("loginOrReg", "Login: ");
        }
    }
};

Session.setDefault("username", "");
Session.setDefault("password", "");

Template.loggedIn.events = {
    'click': function(event) {
        Meteor.logout();
    }
};
