const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));

function sanitize(val) {
    if(val === undefined) {
        return 'DEFAULT';
    } else if(Array.isArray(val)) {
        return sanitize('{' + val.join(', ') + '}');
    } else if(typeof(val) === 'string' ) {
        return '\'' + val.replace('\'', '\'\'') + '\'';
    } else {
        return val;
    }
}

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
            (item) => '(' + keys.map((key) => item[key]).map(sanitize).join(', ') + ')'
        ).join(', ');
    } else {
        const item = args[0];
        keys = Object.keys(item);
        assertColumnInModel(item, model);
        values = '(' + keys.map((key) => item[key]).map(sanitize).join(', ') + ')';
    }

    const queryString = 'INSERT INTO ' + model.table
        + '(' + keys.map(helper.addDoubleQuotes).join(', ') + ')'
        + ' VALUES' + values
        + ' RETURNING *';
    
    console.log(queryString)
    const result = await client.query(queryString);
    return result.rows;
}