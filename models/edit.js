var fs = require('fs');
module.exports = {
    queryAll: function(path) {
        return JSON.parse(fs.readFileSync(path));
    },
    query: function(path, key, value) {
        var table = JSON.parse(fs.readFileSync(path));
        var result = [];
        for(var i = 0; i < table.length; i++) {
            if (table[i].hasOwnProperty(key)) {
                if(table[i][key] == value) {
                    result.push(table[i]);
                }
            }
        }
        return result;
    },
    add: function(path, row) {
        var table = JSON.parse(fs.readFileSync(path));
        table.push(row);
        fs.writeFileSync(path, JSON.stringify(table, undefined, 2))
    },
    queryIncludes: function(path, listname, item) {
        var table = this.queryAll(path);
        var result = [];
        for (var i = 0; i < table.length; i++) {
            for (var x = 0; x < table[i][listname].length; x++) {
                if(table[i][listname][x] == item) {
                    result.push(table[i]);
                }
            }
        }
        return result;
    },
    update: function(path, key, value, newkey, newvalue) {
        console.log('why me');
        var table = this.queryAll(path);
        for (var i = 0; i < table.length; i++) {
            if(table[i].hasOwnProperty(key)) {
                if(table[i][key] == value) {
                    console.log('hi');
                    table[i][newkey] = newvalue;
                }
            }
        }
        fs.writeFileSync(path, JSON.stringify(table, undefined, 2));
    }
}