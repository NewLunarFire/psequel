module.exports = function (count) {
    if(typeof count === 'number') {
        if(!Number.isInteger(count) || count < 1)
            throw new Error('limit must be a positive integer')
    } else if(typeof count === 'string') {
        count = parseFloat(count);
        if(!Number.isInteger(count) || count < 1)
            throw new Error('limit must be a positive integer')
    } else {
        throw new Error('Invalid limit argument');
    }

    const clauses = (this.clauses === null || this.clauses === undefined)
        ? {'limit' : count}
        : Object.assign({}, this.clauses, {'limit' : count});

    return Object.assign({}, this, {'clauses': clauses});;
}