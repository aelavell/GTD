Deps.autorun(function() {
    Session.get("mode");
    Session.set("doModeMode", "list");
});

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
    if(Session.equals("loginOrReg", "login")) {
        return "<input type=button class=registerToggle value=Register />";
    } else {
        return "<input type=button class=registerToggle value=Login />";       
    }
}

Template.loggedIn.doModeButton = function() {
    if( Session.equals('doModeMode', 'list') ) {
        return "<button id=doButton type=button>PopDo</button>";        
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

Template.topHud.mode = function() {
    if( Meteor.user() === null ) {
        return 'A+';
    } else {
        return Session.get('mode');
    }
}

Template.topHud.events = {
    'click .registerToggle': function (event) {
        Session.set("loginMode", "username");        
        if (Session.get("loginOrReg") === "login") {
            Session.set("loginOrReg", "register");
        } else {
            Session.set("loginOrReg", "login");
        }
        if( document.getElementById('loginText') != null) {
            document.getElementById('loginText').focus();
        }
    },
    'click #doButton': function (event) {   
    	if( Session.equals('doModeMode', 'list') ){
    		Session.set('doModeMode', 'task');
        	var taskCount=Tasks.find({userId: Meteor.userId(), completed : false, processed : true}).count(); 
        	var randomNumber=Math.floor(Math.random()*taskCount);
        	Session.set("doSelectedTaskNum", randomNumber);
            Session.set("do_selectedTask", "");
        } else {
            Session.set('doModeMode', 'list');
        }   
    },
    'click #doSomethingElseButton': function (event) {
        var taskCount=Tasks.find({userId: Meteor.userId()}).count(); 
        var randomNumber=Math.floor(Math.random()*taskCount);
        Session.set("doSelectedTaskNum", randomNumber);        
    },
    'click .done_button' : function(event) {
        Tasks.update(
            Session.get("do_selectedTask"),
            {$set: {completed: true, processed: true}}
        );
        Session.set("do_selectedTask", "");
    }
};

Template.topHud.taskSelected = function() {
    return !Session.equals("do_selectedTask", "");
}

Template.bottomHud.events = {
    'click' : function(event) {
        Session.set('mode', ''); // force the dependent variables to get cleared
        // to defaults
        Session.set('mode', event.currentTarget.id);
    },
};
