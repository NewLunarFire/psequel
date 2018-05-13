module.exports = {
    toAsync: async function(res) {
        if(res instanceof Error)
            throw res;
        
        return res;
    },
    addQuotes: function (val) {
        if(typeof(val) === 'string' )
            return '\'' + val.replace('\'', '\'\'') + '\'';
        else
            return val;
    },
    addDoubleQuotes: function(val) {
        if(typeof(val) === 'string' )
            return '"' + val.replace('"', '""') + '"';
        else
            return val;
    } 
}