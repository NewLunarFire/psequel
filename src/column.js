const operators = [
    {
        name: 'equals',
        symbol: '='
    },
    {
        name: 'lessThan',
        symbol: '<'
    },
    {
        name: 'greaterThan',
        symbol: '>'
    },
    {
        name: 'lessThanEqual',
        symbol: '<='
    },
    {
        name: 'greaterThanEqual',
        symbol: '>='
    }
]

module.exports = function(columnName) {
    this.name = columnName;

    const that = this;
    operators.forEach((operator) => {
        that[operator.name] = function(value) {
            return {
                'column': columnName,
                'op': operator.symbol,
                'value': value
            }
        }
    })
}