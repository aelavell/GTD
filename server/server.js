user0 = {
    "username": "sup",
    "password": "cuz"
};
user1 = {
    "username": "hey",
    "password": "baby"
};

Meteor.startup(function() {
    Meteor.users.remove({});
    Accounts.createUser(user0);
    Accounts.createUser(user1);
});

