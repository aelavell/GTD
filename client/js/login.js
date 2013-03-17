//I didn't bother commenting this
//if anyone finds it confusing let me know and I'll go through and comment it
//-Brad
Template.login.usernameAcquired = function() {
    return Session.get('username');
};

Template.login.usernameRequired = function() {
    if( !Session.get('username') ) {
        return true;
    } else {
        return false;
    }
};

Template.login.emailRequired = function() {
    if(Session.equals("loginOrReg", "Register: ") && !Session.get('email') ) {
        return true;
    } else {
        return false;
    }
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
};

Template.login.emailTextBox = function() {
    if(Session.equals("loginOrReg", "Login: ")) {
        return "<input type=text class=loginText autofocus placeholder='This should only appear during registration'></textarea>";
    } else {
        return "<input type=text class=loginText autofocus placeholder='email address'></textarea>";
    }
};

Template.login.passwordTextBox = function() {
    return "<input type=password class=loginText autofocus placeholder=password></textarea>";
};

Template.topHud.loginButton = function() {
    if(Session.equals("loginOrReg", "Login: ")) {
        return "<input type=button class=registerToggle value=Register />";
    } else {
        return "<input type=button class=registerToggle value=Login />";       
    }
};

Template.login.events = {
    'keypress': function (event) {
        if (event.keyCode == 13) {
            if (!Template.login.usernameAcquired()) {
                Session.set("username", event.currentTarget.value);
                event.currentTarget.value = "";
            } else if(Session.equals("loginOrReg", "Register: ") && Template.login.emailRequired()) {
                Session.set("email", event.currentTarget.value);
                event.currentTarget.value = "";                
            }
            else {
                if(Session.equals("loginOrReg", "Login: ")) {                    
                    Meteor.loginWithPassword(Session.get('username'), event.currentTarget.value);
                    Session.set("username",null);
                    Session.set("email",null);
                    Session.set("password",null);
                } 
                else if (Session.equals("loginOrReg", "Register: ")) {
                    Accounts.createUser({username: Session.get("username"), email: Session.get('email'), password: event.currentTarget.value});
                    Session.set("loginOrReg", "Login: ");
                    Session.set("username",null);
                    Session.set("email",null);
                    Session.set("password",null);
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
        } else {
            Session.set("loginOrReg", "Login: ");
        }
        if( document.getElementById('loginText') != null) {
            document.getElementById('loginText').focus();
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
