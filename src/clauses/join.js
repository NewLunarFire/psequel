module.exports = function(clause) {
    const clauses = (this.clauses === null || this.clauses === undefined)
        ? {'join' : clause}
        : Object.assign({}, this.clauses, {'join' : clause});

    return Object.assign({}, this, {'clauses': clauses});
}