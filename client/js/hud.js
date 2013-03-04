Session.setDefault('mode', 'collect');

Template.modeManager.collectMode = function() {
    return Session.get('mode') === 'collect';
}

Template.modeManager.processMode = function() {
    return Session.get('mode') === 'process';
}

Template.modeManager.reviewMode = function() {
    return Session.get('mode') === 'review';
}

Template.modeManager.doMode = function() {
    return Session.get('mode') === 'do';
}

Template.bottomHud.events = {
    'click' : function(event) {
        Session.set('mode', event.currentTarget.id);
    }
};
