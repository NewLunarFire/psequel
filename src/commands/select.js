const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));

const addQuotes = (str) => '\'' + str.replace('\'', '\'\'') + '\'';

function getColumnSelector(columns, model) {
    if(columns.length === 0) {
        // Star, nothing to validate
        return '*';
    }
    
    if(columns.length === 1) {
        if(typeof(columns[0]) === 'string')  {
            //Single column passed as string
            
            // Verify if part of schema
            if(!model.columns.includes(columns[0]))
                return new Error('Column not present in model');

            // Return sole column, escape quotes if necessary
            return addQuotes(columns[0]);
        } else if(typeof(columns[0]) === 'object' && Array.isArray(columns[0]))  {
            var res = columns[0].find((col) => typeof(col) !== 'string');
            if(res !== undefined)
                return Error('Invalid type, expected strings');
            
            var res = columns[0].find((col) => !model.columns.includes(col));
            if(res !== undefined)
                return Error('Column ' + addQuotes(res) + ' not present in model');

            return columns[0].map(addQuotes).join(', ');
        }
    }
        
    return new Error('Invalid column selector');
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
        return new Error('Invalid where clause');
    }

    return clauseText;
}

module.exports = async function select(client, model, columns) {
    const columnSelector = await helper.toAsync(getColumnSelector(columns, model));
    const whereClause = this.clauses && this.clauses.where
        ? await helper.toAsync(parseWhereClause(this.clauses.where))
        : null;
    const queryString = 'SELECT ' + columnSelector + ' FROM ' + model.table + (whereClause !== null ? ' WHERE ' + whereClause : '');
    const result = await client.query(queryString);
    return result.rows;
}