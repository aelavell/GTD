Template.doIt.nextActions = function() {
    return Items.find({userId: Meteor.userId()});
};
