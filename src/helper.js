module.exports = {
    toAsync: async function(res) {
        if(res.error)
            throw res.error;
        else
            return res.value;
    },
    error: function(err) {
        return {'error': {'message': err}};
    },
    value: function(val) {
        return {'error': false, 'value': val};
    }
}