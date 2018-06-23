const path = require('path');
const parseWhere = require('../parser/where');
const query = require(path.join(__dirname, '..', 'query'));

module.exports = async function (client, model) {
    var queryString = 'DELETE FROM ' + model.table;

    if(this.clauses) {
        if(this.clauses.where)
            queryString += ' WHERE ' + parseWhere(this.clauses.where);
    }
    
    return await(query(client, this.options, queryString)).rows;
}