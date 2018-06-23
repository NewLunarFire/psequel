const helper = require('../helper');

module.exports = function (clause) {
    if(!['=', '<', '<=', '>', '>='].includes(clause.op))
        throw new Error('Invalid where clause');

    return `${helper.addDoubleQuotes(clause.column)} ${clause.op} ${helper.addQuotes(clause.value)}`;
}