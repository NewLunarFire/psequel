module.exports = function(pgClient) {
    return {
        Model: function(obj) {
            const table = obj.table;
            const columns = obj.columns;

            return {
                select: async function() {
                    var columnSelector = '*';
                    if(arguments.length == 1) {
                        if(typeof(arguments[0]) === 'string')  {
                            columnSelector = arguments[0];
                        } else if(typeof(arguments[0]) === 'object')  {
                            if(Array.isArray(arguments[0])) {
                                columnSelector = arguments[0].join(', ');
                            }
                        }

                    }

                    const result = await pgClient.query('SELECT ' + columnSelector + ' FROM ' + table);
                    return result.rows;
                }
            }
        }
    }
}