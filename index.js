const path = require('path');

//Commands
const select = require(path.join(__dirname, '/src/commands/select'));
const insert = require(path.join(__dirname, '/src/commands/insert'));
const del = require(path.join(__dirname, '/src/commands/delete'));
const update = require(path.join(__dirname, '/src/commands/update'));

// Clauses
const where = require(path.join(__dirname, '/src/clauses/where'));
const limit = require(path.join(__dirname, '/src/clauses/limit'));
const join = require(path.join(__dirname, '/src/clauses/join'));

const Column = require(path.join(__dirname, '/src/column'));

const defaultOptions = {
    debug: false
}

module.exports = function(_options) {
    const options = Object.assign({}, defaultOptions, _options);
    return {
        options,
        Model: function(model) {
            var columns = {};
            model.columns.forEach(el => {
                columns[el] = new Column(el, model.table);
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

                update: async function(values) {
                    return await update.bind(this)(client, model, values)
                },

                delete: async function() {
                    return await del.bind(this)(client, model);
                },

                selectOne: async function() {
                    const res = await select.bind(this.limit(1))(client, model, arguments)
                    return res.length === 0 ? null :res[0]
                },

                //Clauses
                where,
                limit,
                join: function(left, right) {
                    return join.bind(this)(left, right)
                },

                options,
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