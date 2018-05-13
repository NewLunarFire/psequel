const path = require('path');

//Commands
const select = require(path.join(__dirname, '/src/commands/select'));
const insert = require(path.join(__dirname, '/src/commands/insert'));
// Clauses
const where = require(path.join(__dirname, '/src/clauses/where'));


const Column = require(path.join(__dirname, '/src/column'));

module.exports = function(client) {
    return {
        Model: function(model) {
            var columns = {};
            model.columns.forEach(el => {
                columns[el] = new Column(el);
            });
            return {
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

                //Clauses
                where: where
            }
        }
    }
}