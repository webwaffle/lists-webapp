var editor = require('../models/edit');
module.exports = {
    auth_login: function(username, password) {
        var matches = editor.query('data/users.json', 'username', username);
        if (matches.length == 0) {
            /*
            codes:
            0- success
            1- user doesn't exist
            2- incorrect password
            */
            return [1, null];
        } else {
            var user = matches[0];
            if (user.password == password) {
                return [0, user.id];
            } else {
                return [2, null];
            }
        }
    },
    create_user: function(username, password, time) {
        var toPut = {
            id: null, //save for later
            username: username,
            password: password,
            created: time
        };
        if(editor.queryAll('data/users.json')[0]) {
            //if this isnt the first one
            toPut.id = editor.queryAll('data/users.json').reverse()[0].id + 1;
        } else {
            //if it is
            toPut.id = 0
        }
        editor.add('data/users.json', toPut);
        return true;
    }
}