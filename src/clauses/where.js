module.exports = function (clause) {
    const clauses = (this.clauses === null || this.clauses === undefined)
        ? {'where' : clause}
        : Object.assign({}, this.clauses, {'where' : clause});

    return Object.assign({}, this, {'clauses': clauses});;
}