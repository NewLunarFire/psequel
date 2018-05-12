const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));

function getColumnSelector(args) {
    // By default star
    var result = '*';
    
    if(args.length == 0) {
        result = '*';
    } else if(args.length == 1) {
        if(typeof(args[0]) === 'string')  {
            result = args[0];
        } else if(typeof(args[0]) === 'object')  {
            if(Array.isArray(args[0])) {
                result = args[0].join(', ');
            }
        }
    } else {
        return helper.error('Invalid column selector');
    }

    return helper.value(result);
}

function parseWhereClause(clause) {
    var clauseText;
    switch(clause.op) {
        case 'eq':
            clauseText = clause.column + ' = ';
            if(isNaN(clause.value))
                clauseText += '\'' + clause.value + '\'';
            else
                clauseText += clause.value;
            break;
        default:
            return helper.error('Invalid where clause');
    }

    return helper.value(clauseText);
}

module.exports = async function select(client, table, args) {
    const columnSelector = await helper.toAsync(getColumnSelector(args));
    const whereClause = this.clauses && this.clauses.where
        ? await helper.toAsync(parseWhereClause(this.clauses.where))
        : null;
    const queryString = 'SELECT ' + columnSelector + ' FROM ' + table + (whereClause !== null ? ' WHERE ' + whereClause : '');
    const result = await client.query(queryString);
    console.log(result);
    return result.rows;
}