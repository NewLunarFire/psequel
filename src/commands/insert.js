const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));

function sanitize(val) {
    if(Array.isArray(val)) {
        return sanitize('{' + val.join(', ') + '}');
    } else if(typeof(val) === 'string' ) {
        return '\'' + val.replace('\'', '\'\'') + '\'';
    } else {
        return val;
    }
}

module.exports = async function (client, model, args) {
    const item = args[0];
    var res = Object.keys(item).find((col) => !model.columns.includes(col));
    if(res !== undefined)
        return Error('Column \'' + res + '\' not present in model');
    
    const queryString = 'INSERT INTO ' + model.table
        + '(' + Object.keys(item).map(helper.addDoubleQuotes).join(', ') + ')'
        + ' VALUES(' + Object.keys(item).map((key) => item[key]).map(sanitize).join(', ') + ')'
        + ' RETURNING *';
    
    console.log(queryString)
    const result = await client.query(queryString);
    return result.rows;
}