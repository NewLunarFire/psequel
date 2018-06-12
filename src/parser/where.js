const escape = ((value) => isNaN(value) ? '\'' + value + '\'' : value);

module.exports = function (clause) {
    switch(clause.op) {
        case 'eq':
            return clause.column + ' = ' + escape(clause.value);
        case 'lt':
            return clause.column + ' < ' + escape(clause.value);
        case 'lte':
            return clause.column + ' <= ' + escape(clause.value);
        case 'gt':
            return clause.column + ' > ' + escape(clause.value);
        case 'gte':
            return clause.column + ' >= ' + escape(clause.value);
        default:
            throw new Error('Invalid where clause');
    }
}