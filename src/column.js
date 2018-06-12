function equalsValue(columnName) {
    return function(value) {
        return {
            'column': columnName,
            'op': 'eq',
            'value': value
        }
    }
}

function lessThan(columnName) {
    return function(value) {
        return {
            'column': columnName,
            'op': 'lt',
            'value': value
        } 
    }
}

const operators = [
    ['equals', 'eq'], ['lessThan', 'lt'], ['greaterThan', 'gt'], ['lessThanEqual', 'lte'], ['greaterThanEqual', 'gte']
]

module.exports = function(columnName) {
    this.name = columnName;

    const that = this;
    operators.forEach((operator) => {
        that[operator[0]] = function(value) {
            return {
                'column': columnName,
                'op': operator[1],
                'value': value
            }
        }
    })
}