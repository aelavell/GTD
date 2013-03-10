Template.doIt.nextActions = function() {
    return Tasks.find({userId: Meteor.userId()});
};
