Session.setDefault("reviewing", "");
Session.setDefault("projectUnderReview", "");
var review_selectedButton = "";

Deps.autorun(function() {
    Session.get("mode");
    review_selectedButton = "";
    Session.set("reviewing", "");
    Session.set("projectUnderReview", "");
});

Template.review.mainMenu = function() {
    return Session.equals("reviewing", "");   
}

Template.review.reviewingProjects = function() {
    return Session.equals("reviewing", "projects");   
}

Template.review.reviewingTickler = function() {
    return Session.equals("reviewing", "tickler");   
}

Template.review.reviewingReference = function() {
    return Session.equals("reviewing", "reference");   
}

Template.review.reviewingCalendar = function() {
    return Session.equals("reviewing", "calendar");   
}


Template.review.projects = function() {
    return Projects.find({userId: Meteor.userId()});
};

Template.review.tasksForProject = function() {
    return Tasks.find({project: Session.get("projectUnderReview"), completed: false});
}

Template.review.completedTasksForProject = function() {
    return Tasks.find({project: Session.get("projectUnderReview"), completed: true});
}

Template.review.projectUnderReview = function() {
    return !Session.equals("projectUnderReview", "");
}


Template.review.tickler = function() {
    return Tasks.find({userId: Meteor.userId(), section: "tickler"});
}


Template.review.reference = function() {
    return Tasks.find({userId: Meteor.userId(), section: "reference"});
}

Template.review.events = {
    'click #review_projects' : function(event) {
        Session.set("reviewing", "projects");   
    },
    'click #review_tickler' : function(event) {
        Session.set("reviewing", "tickler");   
    },
    'click #review_reference' : function(event) {
        Session.set("reviewing", "reference");   
    },
    'click .project_button' : function(event) {
        Session.set("projectUnderReview", this.value);  
    },
    'keyup': function (event) {
        // insert new project
        if (event.keyCode == 13) {
            if (event.currentTarget.value.trim() !== '') {
                Projects.insert({
                    userId: Meteor.userId(),
                    value: event.currentTarget.value.trim(),
                });    
                event.currentTarget.value = '';
                Meteor.flush();
            }
        }
    },
    'click .do_it_button' : function(event) {
        if (review_selectedButton !== "") {
            $(review_selectedButton).removeClass("selected_button");
        }
        review_selectedButton = event.currentTarget;
        $(review_selectedButton).addClass("selected_button");
        Session.set("do_selectedTask", this._id);
    }
};
