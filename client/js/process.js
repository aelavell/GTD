Template.process.unprocessedTasks = function() {
    return Tasks.find({processed: false});
};

Template.process.projects = function() {
    return Projects.find({});
};

Template.process.processingTask = function() {
    return !Session.equals("processing", "");   
}

Template.process.currentValue = function() {
    return Tasks.findOne({"_id": Session.get("processing")}).value;
}

Template.process.events = {
    'click .unprocessed_task': function(event) {
        Session.set("processing", this._id);
    },
    'click .project_button' : function(event) {
        var project = $(event.currentTarget).contents().filter(function(){
            return this.nodeType === 3; 
        }).text();
        if (!Session.equals("selectedProject", project)) {
            Session.get("selectedProject");
            // need to un-highlight the selected project


            Session.set("selectedProject", project);
            $(event.currentTarget).addClass("selected_button");
        }
    },
    'click #process_tickler' : function(event) {
        Tasks.update(
            Session.get("processing"),
            {$set: {section: 'tickler', processed: true, project: Session.get("selectedProject")}}
        );
        Session.set("processing", "");
    },
    'click #process_reference' : function(event) {
        Tasks.update(
            Session.get("processing"),
            {$set: {section: 'reference', processed: true, project: Session.get("selectedProject")}}
        );
        Session.set("processing", "");
    },
    'click #process_next_actions' : function(event) {
        Tasks.update(
            Session.get("processing"),
            {$set: {section: 'next_actions', processed: true, project: Session.get("selectedProject")}}
        );
        Session.set("processing", "");
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
