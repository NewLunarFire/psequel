const path = require('path');
const where = require(path.join(__dirname, '/src/clauses/where'));
const select = require(path.join(__dirname, '/src/commands/select'));

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