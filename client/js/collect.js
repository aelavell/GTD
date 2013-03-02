Template.collect.events = {
    'keyup': function (event) {
        if (event.keyCode == 13) {
            
            Items.insert({desc: event.currentTarget.value.trim()});    
            event.currentTarget.value = '';
            event.currentTarget.placeholder = 'collected!';
            Meteor.flush();
            Meteor.setTimeout(function() {
                $("#collector").attr('placeholder', 'your idea'); 
            }, 1500);
        }
    }
}

