user = {
    "username": "sup",
    "password": "cuz"
}

Meteor.startup(function() {
    Meteor.users.remove({});
    Accounts.createUser(user);
});

