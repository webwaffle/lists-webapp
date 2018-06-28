var editor = require('../models/edit');
module.exports = {
    get_lists: function(userid) {
        
    },
    create_list: function(userid, username, listname) {
        var toPut = {
            id: null,
            name: listname,
            creator: {
                id: userid,
                username: username
            },
            members: [],
            items: []
        };
        if(editor.queryAll('data/lists.json').length > 0) {
            toPut.id = editor.queryAll('data/lists.json').reverse()[0].id + 1;
        } else {
            toPut.id = 0;
        }
        editor.add('data/lists.json', toPut);
    }
}