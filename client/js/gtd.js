// Define Minimongo collections to match server/publish.js.
lists = new Meteor.Collection("lists");

Template.loginController.loading = function() {
    return Meteor.user() == null; 
}

Template.next_actions.loading = function() {
    return true;
}

Template.test.events = {
    'click': function (event) {
    }
}
