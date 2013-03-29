Session.setDefault("process_processing", "");
Session.setDefault("taskMonth", -1);
Session.setDefault("taskDay", -1);
Session.setDefault("taskYear", -1);
Session.setDefault("taskHour", -1);
Session.setDefault("taskMinute", -1);
var process_selectedProject = "";
var process_selectedButton = "";

Deps.autorun(function() {
    Session.get("mode");
    Session.set("process_processing", "");
    process_selectedProject = "";
    process_selectedButton = "";
});

function theCalendar() {    
    document.getElementById("months").onchange = populateDays; // onchange will grab the days array from the function populateDays
}

function populateDays() {
    var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31); // an array of the number of days in each month
    
    var monthString = document.getElementById("months").selectedIndex // puts the days in the value according to the array
    monthString = (monthString === 0) ? null : monthString;

    if (monthString != "") {
        var theMonth = parseInt(monthString) - 1; // this forces the monthString to be a string

        document.getElementById("days").options.length = 0; // sets the length of the array and starts it with option = 0
        for(var i=0; i<monthDays[theMonth]; i++) {
            document.getElementById("days").options[i] = new Option(i + 1); // creates the list of days up to what the array intends
        }
    }
}

Template.process.unprocessedTasks = function() {
    return Tasks.find({userId: Meteor.userId(), processed: false});
};

Template.process.projects = function() {
    return Projects.find({userId: Meteor.userId()}, {sort: ["value", "asc"]});
};

Template.process.processingTask = function() {
    return !Session.equals("process_processing", "");
}

Template.process.currentValue = function() {
    return Tasks.findOne({"_id": Session.get("process_processing")}).value;
}

Template.process.events = {
    'click .unprocessed_task': function(event) {
        Session.set("process_processing", this._id);
        // document.getElementById("days").selectedIndex = 0;  //sets the selected day for task to 0
        // document.getElementById("months").selectedIndex = 0; // sets the selected month for task to 0
    },

    'change #months' : function(event) {
        populateDays();
        Session.set("taskMonth", document.getElementById("months").selectedIndex - 1);
        Session.set("taskDay", 1);
        var e = document.getElementById("years");
        var yearVal = parseInt(e.options[e.selectedIndex].text);
        Session.set("taskYear", yearVal);
    },
    'change #days' : function(event) {
        Session.set("taskDay", document.getElementById("days").selectedIndex + 1);
    },
    'change #years' : function(event) {
        var e = document.getElementById("years");
        var yearVal = parseInt(e.options[e.selectedIndex].text);
        Session.set("taskYear", yearVal);
    },
    'change #time' : function(event) {
        var e = document.getElementById("time");
        var timeVal = e.options[e.selectedIndex].text.split(":"); 
        Session.set("taskHour", timeVal[0]);
        Session.set("taskMinute", (typeof timeVal[1] == 'undefined') ? 0 : timeVal[1]);       
    },

    'click .project_button' : function(event) {
        var project = $(event.currentTarget).contents().filter(function(){
            return this.nodeType === 3; 
        }).text();
        
        if (process_selectedButton !== "") {
            $(process_selectedButton).removeClass("selected_button");
        }
        process_selectedButton = event.currentTarget;
        $(process_selectedButton).addClass("selected_button");
        process_selectedProject = project;
    },

    'click #process_tickler' : function(event) {
        Tasks.update(
            Session.get("process_processing"),
            {$set: {section: 'tickler', processed: true, completed: false, project: process_selectedProject}}
        );
        Session.set("process_processing", "");
        Session.set("taskMonth", -1);
        Session.set("taskDay", -1);
        Session.set("taskYear", -1);
        Session.set("taskHour", -1);
        Session.set("taskMinute", -1);
    },
    'click #process_reference' : function(event) {
        Tasks.update(
            Session.get("process_processing"),
            {$set: {section: 'reference', processed: true, completed: false, project: process_selectedProject}}
        );
        Session.set("process_processing", "");
        Session.set("taskMonth", -1);
        Session.set("taskDay", -1);
        Session.set("taskYear", -1);
        Session.set("taskHour", -1);
        Session.set("taskMinute", -1);
    },
    'click #process_next_actions' : function(event) {
        Tasks.update(
            Session.get("process_processing"),
            {$set: {section: 'next_actions', processed: true, completed: false, project: process_selectedProject}}
        );
        Session.set("process_processing", "");
        Session.set("taskMonth", -1);
        Session.set("taskDay", -1);
        Session.set("taskYear", -1);
        Session.set("taskHour", -1);
        Session.set("taskMinute", -1);
    },
    'click #process_calendar' : function(event) {
        var year = Session.get("taskYear");
        var month = Session.get("taskMonth");
        var day = Session.get("taskDay");
        var hour = Session.get("taskHour");
        var minute = Session.get("taskMinute");
        var taskDate = new Date(year,
                                month,
                                day,
                                hour,
                                minute);
        var taskEndDate = new Date(year,
                                   month,
                                   day,
                                   hour + 1,
                                   minute);
        if( month === -1) {
            window.alert("Please select a date before adding your task to the calendar");
        } else {
            Tasks.update(
                Session.get("process_processing"),
                {$set: {section: 'calendar', startDate: taskDate, endDate: taskEndDate, processed: true, completed: false, project: process_selectedProject}}
            );
        }
        Session.set("process_processing", "");
        Session.set("taskMonth", -1);
        Session.set("taskDay", -1);
        Session.set("taskYear", -1);
        Session.set("taskHour", -1);
        Session.set("taskMinute", -1);
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
    }
};
