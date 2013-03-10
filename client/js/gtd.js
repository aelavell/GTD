Meteor.startup(function() {
    Session.set('mode', 'collect');
    Session.set('processing', '');
    Session.set("loginOrReg", "Login: ");
});
