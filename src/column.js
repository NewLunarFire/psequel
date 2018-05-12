function equalsValue(columnName) {
    return function(value) {
        return {
            'column': columnName,
            'op': 'eq',
            'value': value
        }
    }
}

module.exports = function(columnName) {
    this.name = columnName;
    this.equalsValue = equalsValue(columnName);
}