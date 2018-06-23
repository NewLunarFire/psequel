const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));
const query = require(path.join(__dirname, '..', 'query'));

function assertColumnInModel(item, model) {
    var res = Object.keys(item).find((col) => !model.columns.includes(col));
    if(res !== undefined)
        throw new Error('Column \'' + res + '\' not present in model');
}

module.exports = async function (client, model, args) {
    var keys, values;
    if(Array.isArray(args[0])) {
        const items = args[0]; 
        keys = [];
        for(var i = 0; i < items.length; i++) {
            assertColumnInModel(items[i], model);
            Object.keys(items[i]).forEach((key) => { if(!keys.includes(key)) keys.push(key) });
        }

        values = items.map(
            (item) => '(' + keys.map((key) => item[key]).map(helper.sanitize).join(', ') + ')'
        ).join(', ');
    } else {
        const item = args[0];
        keys = Object.keys(item);
        assertColumnInModel(item, model);
        values = '(' + keys.map((key) => item[key]).map(helper.sanitize).join(', ') + ')';
    }

    const queryString = 'INSERT INTO ' + model.table
        + '(' + keys.map(helper.addDoubleQuotes).join(', ') + ')'
        + ' VALUES' + values
        + ' RETURNING *';
    
    return await(query(client, this.options, queryString)).rows;
}