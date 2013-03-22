Session.setDefault("do_selectedTask", "");
var do_selectedButton = "";

Deps.autorun(function() {
    Session.get("mode");
    Session.set("do_selectedTask", "");
    do_selectedButton = "";
});

Template.doItList.nextActions = function() {
    return Tasks.find({userId: Meteor.userId(), completed: false, section: "next_actions"});
};

Template.doItItem.doItItem = function() {
	return Tasks.find({userId: Meteor.userId()}, {skip: Session.get("doSelectedTaskNum"), limit: 1}).fetch()[0].value;
};

Template.doItList.events = {
    // "click .do_it_button" : function(event) {
    //     Tasks.update(
    //         this._id,
    //         {$set: {completed: true, processed: true}}
    //     );
    // },

    'click .do_it_button' : function(event) {
        if (do_selectedButton !== "") {
            $(do_selectedButton).removeClass("selected_button");
        }
        do_selectedButton = event.currentTarget;
        $(do_selectedButton).addClass("selected_button");
        Session.set("do_selectedTask", this._id);
    },
};
