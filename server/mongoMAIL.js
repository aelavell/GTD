
//Will have to change the dir variable to the directory path where the mail files get put
/**********************************
 *    Run getMail() every 5min    *
 **********************************/

var dbTasks = new Meteor.Collection("tasks");
getMail(dbTasks);
Meteor.setInterval(function() {
    getMail(dbTasks);
}, 300000);

function getMail(Tasks) {

    //folder with new email
    var dir = "/home/brad/Maildir/new/";

    var require = __meteor_bootstrap__.require;
    var fs = require('fs');

    //store the filenames of the files in dir in fileList[]
    var fileList = new Array();
    fileList = fs.readdirSync(dir);

    for (i = 0; i < fileList.length; i++) {
        var fileN = fileList[i];
        var from = "";
        var subject = "";
        var path = dir + fileList[i];

        //Stream the current file, put it into a string, split the string, go through the content line by line.
        fs.readFileSync(path)
                .toString().split("\n")
                .forEach(function(line) {
            //count the from and subject lines so to avoid duplicates
            var countFrom = 0,
                    countSub = 0;
            //if "Subject:" is in the line, cut it out and put the remainder in subject.
            if (line.search("Subject:") > -1 && countSub === 0) {
                subject = line.substring(9, line.length);
                countSub++;
                //else if "From:" is in the line, cut it out and put the remainder in from.
            } else if (line.search("From:") > -1 && countFrom === 0) {
                var newFrom = line.substring(6, line.length).split(" ");
                from = newFrom[0];
                countFrom++;
            }
        });

        //get DB records of from and insert subject as task
        insTask(from, subject, Tasks);

        //delete file
        fs.unlinkSync(path);
    }
}

//Inserts a task in the db based on userEmail
function insTask(userEmail, task, collection) {
    var user = Meteor.users.findOne({'emails.address': {$regex: userEmail, $options: 'i'}}, {fields: {'_id': 1}});
    if (user) {
        collection.insert({
            userId: user._id,
            value: task,
            processed: false,
            completed: false,
            section: "next_actions",
        });
    }
}
