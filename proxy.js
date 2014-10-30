var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');

/**
 * initialise the proxy
 */
var proxy = httpProxy.createProxyServer({});
var databases = {};
var port = 5984;
try {
    var config = JSON.parse(fs.readFileSync('config.json','utf-8'));
    databases = config.database;
    port = config.port;
} catch (err) {
    console.log(err);
    console.log("The Proxy-Server failed to read the config-file and exits.");
    process.exit(0);
}

proxy.on('error', function (error) {
    console.log(error);
});

/**
 * prevent clients from connecting to anything else than the specified dbs
 * by blocking every request that does not contain the specified db-names
 */
var server = http.createServer(function(req, res) {
    
    var currentdb = false;
    
    databases.forEach(function (db) {
        if (req.url.search(db.name) === 1) {
            currentdb = db;
        }
    });
    
    if (currentdb) {
        try {
            proxy.web(req, res, { target: currentdb.remote });
        } catch (error) {
            console.log(error);
            console.log("Proxying to " + currentdb.remote + " did not work.");
            res.statusCode = 401;
            res.end();
        }
        
    } else {
        console.log("Preventing a client from connecting to " + req.url);
        res.statusCode = 401;
        res.end();
    }
});
console.log("The DB-proxy is listening on port " + port);
server.listen(port);


