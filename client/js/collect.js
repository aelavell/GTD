Template.collect.events({
    'keyup': function (event) {
        if (event.keyCode == 13) {
            Tasks.insert({
                userId: Meteor.userId(),
                value: event.currentTarget.value.trim(),
                processed: false,
            });    
            event.currentTarget.value = '';
            event.currentTarget.placeholder = 'collected!';
            Meteor.flush();
            Meteor.setTimeout(function() {
                $("#collector").attr('placeholder', 'your idea'); 
            }, 1500);
        }
    }
});

