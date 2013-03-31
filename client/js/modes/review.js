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

Template.review.reviewingCompleted = function() {
    return Session.equals("reviewing", "completed");   
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

Template.review.completedTasks = function() {
    return Tasks.find({userId: Meteor.userId(), completed: true});
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

Template.calendarTemplate.rendered = function() {
    var taskList = Tasks.find({userId: Meteor.userId(), processed: true, section: "calendar", completed: false});
    var calTasks = [];
    var count = 0;
    taskList.forEach(function(item) {
        var temp = {"id": count,
                    "start": item.startDate,
                    "end": item.startDate,
                    "title": item.value};
        if( !( typeof temp.start == 'undefined' || typeof temp.end == 'undefined'
            || temp.start === 0 || temp.end === 0 ) ) {
            calTasks.push(temp);
            count++;
        }
    });
    var eventData = { 
        events : calTasks };
    $(this.find("#calendar")).weekCalendar( { timeslotsPerHour: 2, 
            timeslotHeigh: 120, 
            hourLine: true, 
            data: eventData,
            readonly: true,
            showHeader: false,
            height: function($calendar) {
                return $(window).height() - $('h1').outerHeight(true);
            },
            eventRender : function(calEvent, $event) {
                if (calEvent.end.getTime() < new Date().getTime()) {
                    $event.css('backgroundColor', '#aaa');
                    $event.find('.time').css({'backgroundColor': '#999', 'border':'1px solid #888'});
                }
            },
            noEvents: function() {
            } 
        } );
    // var calHeight = $('#calendar').outerHeight(); 
    // calHeight = calHeight - $('#bottom_hud').outerHeight();
    // $('#calendar').height(calHeight);
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
    'click #review_calendar' : function(event) {
        Session.set("reviewing", "calendar");
    },
    'click #review_completed' : function(event) {
        Session.set("reviewing", "completed");  
    },
    'click .project_button' : function(event) {
        Session.set("projectUnderReview", this.value);  
    },
    'click #lastWeek' : function(event) {
        $("#calendar").weekCalendar("prevWeek");
    },
    'click #thisWeek' : function(event) {
        $("#calendar").weekCalendar("today");
    },
    'click #nextWeek' : function(event) {
        $("#calendar").weekCalendar("nextWeek");
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
