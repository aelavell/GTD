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
    if(Session.equals("loginOrReg", "Register") && !Session.get('email') ) {
        return true;
    } else {
        return false;
    }
};

Template.login.usernameMode = function() {
    return Session.equals('loginMode', 'username');
};

Template.login.emailMode = function() {
    return Session.equals('loginMode', 'email');
};

Template.login.passwordMode = function() {
    return Session.equals('loginMode', 'password');
};

Template.login.loginFailed = function() {
    return Session.equals('loginMode', 'loginFailed');
};

Template.login.registerFailed = function() {
    return Session.equals('loginMode', 'registerFailed');
};

Template.login.passwordAcquired = function() {
    return Session.get('password');
};

Template.login.loginLabel = function() {
    return Session.get("loginOrReg");
};

Template.login.usernameTextBox = function() {
    if(Session.equals("loginOrReg", "login")) {
        return "<input type=text class=loginText id=usernameTextBox autofocus placeholder=username></input>";
    } else {
        return "<input type=text class=loginText id=usernameTextBox autofocus placeholder='desired username'></input>";
    }
};

Template.login.emailTextBox = function() {
    if(Session.equals("loginOrReg", "login")) {
        return "<input type=text class=loginText id=emailTextBox autofocus placeholder='This should only appear during registration'></textarea>";
    } else {
        return "<input type=text class=loginText id=emailTextBox autofocus placeholder='email address'></input>";
    }
};

Template.login.passwordTextBox = function() {
    return "<input type=password class=loginText id=passwordTextBox autofocus placeholder=password></input>";
};



Template.login.events = {
    'keypress': function (event) {
        if (event.keyCode == 13) {
            if( event.currentTarget.getAttribute('id') === "usernameTextBox" ) {
                if( Session.equals( "loginOrReg", "login") ) {   
                    Session.set( "username", event.currentTarget.value );
                    Session.set( "loginMode", "password" );
                } else if( Session.equals( "loginOrReg", "register") ) {
                    Session.set( "username", event.currentTarget.value );
                    Session.set( "loginMode", "email");
                }
            } else if( event.currentTarget.getAttribute('id') === "emailTextBox") {
                    if( Session.equals( "loginOrReg", "register") ){
                        Session.set( "email", event.currentTarget.value );
                        Session.set( "loginMode", "password");
                    } else {
                        event.currentTarget.placeholder = "You shouldn't be seeing this";
                    }
            } else if( event.currentTarget.getAttribute('id') === "passwordTextBox" ) {
                Session.set( "password", event.currentTarget.value);
                if( Session.equals( "loginOrReg", "login" ) ) {
                    Meteor.loginWithPassword(Session.get('username'), event.currentTarget.value, function(Error) {
                        if( Error ) {
                            Session.set("loginMode", "loginFailed");
                            Session.set("username",null);
                            Session.set("email",null);
                            Session.set("password",null);
                            Meteor.setTimeout(function() {
                                Session.set("loginMode", "username")
                            }, 1000);
                        }
                    });
                } else if( Session.equals("loginOrReg", "register") ) {
                    event.currentTarget.placeholder = "Registering";
                    Accounts.createUser({username: Session.get("username"), email: Session.get('email'), password: event.currentTarget.value}, function(Error) {
                        if( Error ) {
                            Session.set("loginMode", "registerFailed");
                            Session.set("username",null);
                            Session.set("email",null);
                            Session.set("password",null);
                            Meteor.setTimeout(function() {
                                Session.set("loginMode", "username")
                                //$("#loginText").attr('placeholder', 'Incorrect username or password'); 
                            }, 1000);
                        }
                    });
                }
            }
            /*if (!Template.login.usernameAcquired()) {
                Session.set("username", event.currentTarget.value);
                event.currentTarget.value = "";
            } else if(Session.equals("loginOrReg", "Register: ") && Template.login.emailRequired()) {
                Session.set("email", event.currentTarget.value);
                event.currentTarget.value = "";      
            }
            else {
                if(Session.equals("loginOrReg", "Login: ")) {                    
                    Meteor.loginWithPassword(Session.get('username'), event.currentTarget.value);
                    if( Meteor.loggingIn() || Meteor.user() ) {
                        document.getElementById("loginText").placeholder = "bro this doesn't work";
                        event.currentTarget.value = '';
                        event.currentTarget.placeholder = 'bro this doesnt work';
                        $('#loginText').attr('placeholder','Logging in');
                        //event.currentTarget.placeholder = 'Logging in';
                    } else {
                        Meteor.setTimeout(function() {
                            $("#loginText").attr('placeholder', 'Incorrect username or password'); 
                        }, 1500);
                    }
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
                    if( Meteor.loggingIn() || Meteor.user() ) {
                        event.currentTarget.value = '';
                        event.currentTarget.placeholder = 'Registering';
                    } else {
                        Meteor.setTimeout(function() {
                            $(".loginText").attr('placeholder', 'Username taken or Email address invalid'); 
                        }, 1500);  
                    }
                }
                event.currentTarget.value = "";
                Session.set('username', '');
                Meteor.flush();
            }*/
        }
    }
};

Session.setDefault("username", "");
Session.setDefault("password", "");

Template.loggedIn.events = {
    'click #logout': function(event) {
        Meteor.logout(function(event) {
            // hax to make everything get set to defaults
            Session.set("mode", "");    
            Session.set("mode", "collect");
            Session.set("loginMode", "username");
            Session.set("loginOrReg", "login");  
        });

    }
};
