const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));

module.exports = async function (client, model, args) {
    const item = args[0];
    var res = Object.keys(item).find((col) => !model.columns.includes(col));
    if(res !== undefined)
        return Error('Column ' + helper.addQuotes(res) + ' not present in model');
    
    const queryString = 'INSERT INTO ' + model.table
        + '(' + Object.keys(item).map(helper.addDoubleQuotes).join(', ') + ')'
        + ' VALUES(' + Object.keys(item).map((key) => item[key]).map(helper.addQuotes).join(', ') + ')'
        + ' RETURNING *';
    
    const result = await client.query(queryString);
    return result.rows;
}