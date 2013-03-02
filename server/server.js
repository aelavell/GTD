user = {
    "username": "sup",
    "password": "cuz"
}

Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        Accounts.createUser(user);
    }
});

