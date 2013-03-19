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

Template.loggedIn.doModeButton = function() {
    if( Session.equals('doModeMode', 'list') ) {
        return "<button id=doButton type=button>Give me something to do!</button>";        
    } else {
        return "<button id=doButton type=button>Show Task List</button>"; 
    }
}

Template.loggedIn.doModeTaskMode = function() {
    return Session.equals('doModeMode', 'task');
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
        	var taskCount=Tasks.find({userId: Meteor.userId()}).count(); 
        	var randomNumber=Math.floor(Math.random()*taskCount);
        	Session.set("doSelectedTaskNum", randomNumber);
        } else {
            Session.set('doModeMode', 'list');
        }   
    },
    'click #doSomethingElseButton': function (event) {
        var taskCount=Tasks.find({userId: Meteor.userId()}).count(); 
        var randomNumber=Math.floor(Math.random()*taskCount);
        Session.set("doSelectedTaskNum", randomNumber);        
    }
};

Template.bottomHud.events = {
    'click' : function(event) {
        Session.set("processing", "");   
        Session.set('mode', event.currentTarget.id);
    }
};
