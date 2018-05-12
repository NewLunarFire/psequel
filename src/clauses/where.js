module.exports = function where(clause) {
    var clauses = this.clauses;
    if(clauses === null || clauses === undefined)
        clauses = {'where' : clause};
    else
        clauses = Object.assign(clauses, {'where' : clause});

    return Object.assign({}, this, {'clauses': clauses});
}