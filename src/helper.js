module.exports = {
    toAsync: async function(res) {
        if(res instanceof Error)
            throw res;
        
        return res;
    },
    addDoubleQuotes: function(val) {
        if(typeof(val) === 'string' )
            return '"' + val.replace('"', '""') + '"';
        else
            return val;
    },
    sanitize: function(val) {

    } 
}