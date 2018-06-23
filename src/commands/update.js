const path = require('path');
const parseWhere = require(path.join(__dirname, '..', 'parser', 'where'));
const helper = require(path.join(__dirname, '..', 'helper'));
const query = require(path.join(__dirname, '..', 'query'));

function getSetExpression(values) {
    var exprString = '';
    exprString = Object.keys(values).map((key) => `${helper.addDoubleQuotes(key)} = ${helper.sanitize(values[key])}`).join(", ");
    return exprString;
}

module.exports = async function (client, model, values) {
    var queryString = `UPDATE ${model.table} SET ${getSetExpression(values)}`;

    if(this.clauses) {
        if(this.clauses.where)
            queryString += ' WHERE ' + parseWhere(this.clauses.where);
    }
    
    return await(query(client, this.options, queryString)).rows;
}