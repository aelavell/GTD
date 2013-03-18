Template.doItList.nextActions = function() {
    return Tasks.find({userId: Meteor.userId()});
};
