var editor = require('../models/edit');
module.exports = {
    /*get_lists: function(userid, username) {
        var table = editor.queryIncludes('data/lists.json', 'members', {id: userid, username: username});
    },*/
    join_list: function(listid, userid, username) {
        /*Return codes:
        0-Success
        1-Doesn't exist
        2-There's too many of them what are we going to do
        */
        var table = editor.query('data/lists.json', "id", listid);
        if (table.length == 1) {
            toJoin = table[0];
        } else if (table.length == 0) {
            return 1;
        } else {
            return 2;
        }
        orig = [];
        for(var i = 0; i < toJoin.members.length; i++) {
            orig.push(toJoin.members[i]);
        }
        //console.log(orig);
        toJoin.members.push({id: userid, username: username});
        editor.update('data/lists.json', 'members', orig, 'members', toJoin.members);
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