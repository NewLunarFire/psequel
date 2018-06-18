const path = require('path');

//Commands
const select = require(path.join(__dirname, '/src/commands/select'));
const insert = require(path.join(__dirname, '/src/commands/insert'));
const del = require(path.join(__dirname, '/src/commands/delete'));

// Clauses
const where = require(path.join(__dirname, '/src/clauses/where'));
const limit = require(path.join(__dirname, '/src/clauses/limit'));
const join = require(path.join(__dirname, '/src/clauses/join'));

const Column = require(path.join(__dirname, '/src/column'));

module.exports = function(client) {
    return {
        Model: function(model) {
            var columns = {};
            model.columns.forEach(el => {
                columns[el] = new Column(el);
            });

            const obj = {
                col: function(name) {
                    if(columns[name] === undefined)
                        return new Error('This column does not exist');
                    else
                        return columns[name] 
                },
                
                // Model
                columns: columns,

                // Commands
                insert: async function() {
                    return await insert.bind(this)(client, model, arguments)
                },

                select: async function() {
                    return await select.bind(this)(client, model, arguments)
                },

                delete: async function() {
                    return await del.bind(this)(client, model, arguments);
                },

                selectOne: async function() {
                    const res = await select.bind(this.limit(1))(client, model, arguments)
                    return res.length === 0 ? null :res[0]
                },

                //Clauses
                where,
                limit,
                join,

                withClient: function(_client) {
                    client = _client;
                    return this;
                }
            };

            Object.keys(columns).forEach(key => {
                obj[key] = columns[key];
            });

            return obj;
        }
    }
}