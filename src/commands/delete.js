const parseWhere = require('../parser/where');

module.exports = async function (client, model, columns) {
    var queryString = 'DELETE FROM ' + model.table;

    if(this.clauses) {
        if(this.clauses.where)
            queryString += ' WHERE ' + parseWhere(this.clauses.where);
    }
    
    console.log(queryString)
    return await client.query(queryString);
}