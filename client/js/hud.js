Template.modeManager.collectMode = function() {
    return Session.equals('mode', 'collect');
}

Template.modeManager.processMode = function() {
    return Session.equals('mode', 'process');
}

Template.modeManager.reviewMode = function() {
    return Session.equals('mode', 'review');
}

Template.modeManager.doMode = function() {
    return Session.equals('mode', 'do');
}

Template.topHud.doMode = function() {
    return Session.equals('mode', 'do');
}

Template.modeManager.listMode = function() {
	return Session.equals('doModeMode', 'list');
}

Template.modeManager.popDoMode = function() {
	return Session.equals('doModeMode', 'task');
}

Template.topHud.loginButton = function() {
    if(Session.equals("loginOrReg", "Login: ")) {
        return "<input type=button class=registerToggle value=Register />";
    } else {
        return "<input type=button class=registerToggle value=Login />";       
    }
}

Template.loggedIn.doMode = function() {
	return Session.equals('mode', 'do');
}

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
    },
    'click #doButton': function (event) {   
    	if( Session.equals('doModeMode', 'list') ){
    		Session.set('doModeMode', 'task');
    	} else {
    		Session.set('doModeMode', 'list');
    	}	
    	var taskCount=Tasks.find({userId: Meteor.userId()}).count(); 
    	var randomNumber=Math.floor(Math.random()*taskCount);
    	Session.set("doSelectedTask", Tasks.find({userId: Meteor.userId()}, {skip: randomNumber, limit: 1}));
    }
};

Template.bottomHud.events = {
    'click' : function(event) {
        Session.set("processing", "");   
        Session.set('mode', event.currentTarget.id);
    }
};
