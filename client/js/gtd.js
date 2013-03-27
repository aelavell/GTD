Meteor.startup(function() {
    Session.set('mode', 'collect');
    Session.set('processing', '');
    Session.setDefault("loginOrReg", "login");
    Session.setDefault('doModeMode', 'list');
    Session.setDefault('loginMode', 'username');
});
