Session.setDefault("process_processing", "");
var process_selectedProject = "";
var process_selectedButton = "";

Deps.autorun(function() {
    Session.get("mode");
    Session.set("process_processing", "");
    process_selectedProject = "";
    process_selectedButton = "";
});

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
    },
    'click #process_reference' : function(event) {
        Tasks.update(
            Session.get("process_processing"),
            {$set: {section: 'reference', processed: true, completed: false, project: process_selectedProject}}
        );
        Session.set("process_processing", "");
    },
    'click #process_next_actions' : function(event) {
        Tasks.update(
            Session.get("process_processing"),
            {$set: {section: 'next_actions', processed: true, completed: false, project: process_selectedProject}}
        );
        Session.set("process_processing", "");
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
