Session.setDefault("reviewing", "");
Session.setDefault("projectUnderReview", "");

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
    return Projects.find({});
};

Template.review.tasksForProject = function() {
    return Tasks.find({project: Session.get("projectUnderReview")});
}

Template.review.projectUnderReview = function() {
    return !Session.equals("projectUnderReview", "");
}

Template.review.events = {
    'click #review_projects' : function(event) {
        Session.set("reviewing", "projects");   
    },
    'click .project_button' : function(event) {
        Session.set("projectUnderReview", this.value);  
    }
};
