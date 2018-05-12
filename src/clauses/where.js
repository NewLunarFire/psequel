module.exports = function where(clause) {
    const clauses = (this.clauses === null || this.clauses === undefined)
        ? {'where' : clause}
        : Object.assign(clauses, {'where' : clause});

    return Object.assign({}, this, {'clauses': clauses});;
}