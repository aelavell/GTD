Template.modeManager.collectMode = function() {
    return Session.equals('mode', 'collect');
}

Template.modeManager.processMode = function() {
    return Session.equals('mode', 'process');
}

Template.modeManager.reviewMode = function() {
    return Session.equals('mode', 'review');
}

Template.modeManager.doMode = function() {
    return Session.equals('mode', 'do');
}

Template.bottomHud.events = {
    'click' : function(event) {
        Session.set('mode', event.currentTarget.id);
    }
};
