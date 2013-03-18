Template.doItList.nextActions = function() {
    return Tasks.find({userId: Meteor.userId()});
};

Template.doItItem.doItItem = function() {
	return Tasks.find({userId: Meteor.userId()}, {skip: Session.get("doSelectedTaskNum"), limit: 1}).fetch()[0].value;
};
