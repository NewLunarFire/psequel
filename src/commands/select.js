const path = require('path');
const helper = require(path.join(__dirname, '..', 'helper'));
const parseJoin = require(path.join(__dirname, '..', 'parser', 'join'));
const parseWhere = require(path.join(__dirname, '..', 'parser', 'where'));
const query = require(path.join(__dirname, '..', 'query'));

function escapeColumnName(col) {
    var alias = null;
    var name = col;

    if(col.includes(' => ')) {
        const split = col.split(' => ');
        name = split[0];
        alias = split[1];
    }

    return name.split('.').map(helper.addDoubleQuotes).join('.')
        + (alias !== null ? " AS " + helper.addDoubleQuotes(alias) : "");
}

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
                throw new Error('Column not present in model');

            // Return sole column, escape quotes if necessary
            return escapeColumnName(columns[0]);
        } else if(typeof(columns[0]) === 'object' && Array.isArray(columns[0]))  {
            var res = columns[0].find((col) => typeof(col) !== 'string');
            if(res !== undefined)
                throw new Error('Invalid type, expected strings');
            
            //res = columns[0].find((col) => !model.columns.includes(col));
            //if(res !== undefined)
                //throw new Error('Column ' + helper.addDoubleQuotes(res) + ' not present in model');

            return columns[0].map(escapeColumnName).join(', ');
        }
    }
        
    throw new Error('Invalid column selector');
}

module.exports = async function (client, model, columns) {
    var queryString = 'SELECT ' + getColumnSelector(columns, model) + ' FROM ' + model.table;

    if(this.clauses) {
        if(this.clauses.join)
            queryString += ` ${parseJoin(this.clauses.join)}`;
        if(this.clauses.where)
            queryString += ' WHERE ' + parseWhere(this.clauses.where);
        if(this.clauses.limit)
            queryString += ' LIMIT ' + this.clauses.limit;
    }
    
    return (await query(client, this.options, queryString)).rows;
}