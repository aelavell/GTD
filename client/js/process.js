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

Template.process.events({
    'click ': function(event) {
        // var x = event.currentTarget.id; 
        Session.set("processing", this._id);
        if (event.currentTarget.className === "project_button") {
            $(event.currentTarget).addClass("selected_button");
        }
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
});

