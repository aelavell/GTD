Template.doItList.nextActions = function() {
    return Tasks.find({userId: Meteor.userId(), completed: false});
};

Template.doItItem.doItItem = function() {
	return Tasks.find({userId: Meteor.userId(), completed: false}, {skip: Session.get("doSelectedTaskNum"), limit: 1}).fetch()[0].value;
};

Template.doItList.events = {
    "click .do_it_button" : function(event) {
        Tasks.update(
            this._id,
            {$set: {completed: true}}
        );
    }
};
