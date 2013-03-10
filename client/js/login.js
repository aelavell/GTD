Template.login.usernameAcquired = function() {
    return Session.get('username');
};

Template.login.passwordAcquired = function() {
    return Session.get('password');
};

Template.login.loginLabel = function() {
    return Session.get("loginOrReg");
};

Template.login.usernameTextBox = function() {
    if(Session.equals("loginOrReg", "Login: ")) {
        return "<input type=text class=loginText autofocus placeholder=username></textarea>";
    } else {
        return "<input type=text class=loginText autofocus placeholder='desired username'></textarea>";
    }
}

Template.login.passwordTextBox = function() {
    return "<input type=password class=loginText autofocus placeholder=password></textarea>";
}

Template.topHud.loginButton = function() {
    if(Session.equals("loginOrReg", "Login: ")) {
        return "<input type=button class=registerToggle value=Register />";
    } else {
        return "<input type=button class=registerToggle value=Login />";       
    }
}

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
    }
};

Template.topHud.events = {
    'click .registerToggle': function (event) {        
        if (Session.get("loginOrReg") === "Login: ") {
            Session.set("loginOrReg", "Register: ");
            document.topHud.registerToggle.value = "Login";
        } else {
            Session.set("loginOrReg", "Login: ");
            document.topHud.registerToggle.value = "Register";
        }
        document.getElementById('loginText').focus();
    }
};

Session.setDefault("username", "");
Session.setDefault("password", "");

Template.loggedIn.events = {
    'click': function(event) {
        Meteor.logout();
    }
};
