module.exports = function (clauses) {
    return clauses.map((clause) => 
        `${clause.type !== 'default' ? clause.type + " " : ""}` +
        `JOIN ${clause.left.table}` +
        ` ON ${clause.left.table}.${clause.left.name} ` +
        ` = ${clause.right.table}.${clause.right.name}`
    ).join(" ");
}