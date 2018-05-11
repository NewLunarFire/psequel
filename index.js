function error(err) {
    return {'error': {'message': err}};
}

function value(val) {
    return {'error': false, 'value': val};
}

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
        return error('Invalid column selector');
    }

    return value(result);
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
            return error('Invalid where clause');
    }

    return value('WHERE ' + clauseText);
}

async function select(client, table, args) {
    const columnSelector = getColumnSelector(args);
    if(columnSelector.error)
        throw columnSelector.error;

    var whereClause = "";
    if(this.clauses) {
        if(this.clauses.where) {
            whereClause = parseWhereClause(this.clauses.where);
        }
    }
    const queryString = 'SELECT ' + columnSelector.value + ' FROM ' + table + ' ' + whereClause.value;
    const result = await client.query(queryString);
    return result.rows;
}

function where(clause) {
    var clauses = this.clauses;
    if(clauses === null || clauses === undefined)
        clauses = {'where' : clause};
    else
        clauses = Object.assign(clauses, {'where' : clause});

    return Object.assign({}, this, {'clauses': clauses});
}

module.exports = function(pgClient) {
    return {
        Model: function(obj) {
            const client = pgClient;
            return {
                select: async function() {
                    return await select.bind(this)(pgClient, obj.table, arguments);
                },
                where: where
            }
        }
    }
}