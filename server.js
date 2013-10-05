var express   = require('express'),
    http      = require('http');

var app = express();

app.use(app.router);

app.use(function(err, req, res, next) {
  res.send(err.status || 500, {'error': err.message});
});

app.use(function(req, res) {
  res.send(404, {'error': 'Not a valid resource'});
});


// Routes

app.get('/test', function(req, res) {
  res.json({
    key1 : ['a', 'b', 'c'],
    key2 : ['d', 'e', 'f']
  });
});

// Server

http.createServer(app).listen(8080);