module.exports = function(left, right, type) {
    const clause = {
        left,
        right,
        type: type || "default"
    }
    var clauses;
    if(this.clauses === null || this.clauses === undefined) {
        clauses = {join : [clause]};
    } else if(this.clauses.join === null || this.clauses.join === undefined) {
        clauses = Object.assign({}, this.clauses, {'join' : [clause]});
    } else {
        clauses = Object.assign({}, this.clauses);
        clauses.join.push(clause);
    }

    return Object.assign({}, this, {'clauses': clauses});
}