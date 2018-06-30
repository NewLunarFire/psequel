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

function as(alias) {
    
}

module.exports = function(name, table) {
    this.as = (alias) => `${this.table}.${this.name} => ${alias}`
    this.name = name;
    this.table = table;

    const that = this;
    operators.forEach((operator) => {
        that[operator.name] = function(value) {
            return {
                'column': name,
                'op': operator.symbol,
                'value': value
            }
        }
    })
}