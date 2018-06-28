module.exports = {
    addDoubleQuotes: (value) => typeof(value) === 'string' ? '"' + value.replace('"', '""') + '"' : value,
    addQuotes: (value) => isNaN(value) ? '\'' + value + '\'' : value,
    sanitize(value) {
        if(value === undefined) {
            return 'DEFAULT';
        } else if(Array.isArray(value)) {
            return sanitize('{' + value.join(', ') + '}');
        } else if(typeof(value) === 'string' ) {
            return '\'' + value.replace('\'', '\'\'') + '\'';
        } else {
            return value;
        }
    }
}