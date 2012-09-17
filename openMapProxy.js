var http = require('http');

app.get('/tiles/:z/:x/:y.:format', function(req, res){
    var z = req.paramXss('z');
    var x = req.paramXss('x');
    var y = req.paramXss('y');
    var servers = [];

    servers.push('a.tile.openstreetmap.org');
    servers.push('b.tile.openstreetmap.org');
    servers.push('c.tile.openstreetmap.org');

    var httpOptions = {host: servers[Math.floor(Math.random()*servers.length)],
                      port: 80,
                      path: "/" + z + "/" + x + "/" + y + ".png"};

    res.contentType('image/png');
    res.header('Cache-Control', 'max-age=18400');
    var httpGetFile = http.get(httpOptions, function(httpRes){
      httpRes.on('data', function(chunk){
        res.write(chunk, 'binary');
      });
      httpRes.on('end', function(){
        res.end();
      });
    }).on('error', function(err){
      console.log(err);
    })

});