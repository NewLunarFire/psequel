module.exports = async function(client, options, queryString) {
    if(options.debug)
        console.log(queryString)
    
    return await client.query(queryString);
}