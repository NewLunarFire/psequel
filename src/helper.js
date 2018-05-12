module.exports = {
    toAsync: async function(res) {
        if(res instanceof Error)
            throw res;
        
        return res;
    }
}