var express   = require('express'),
    http      = require('http'),
    aws       = require('aws-sdk');

var app = express();

var S3 = new aws.S3();

app.use(app.router);

app.use(function(err, req, res, next) {
  res.send(err.status || 500, {'error': err.message});
});

app.use(function(req, res) {
  res.send(404, {'error': 'Not a valid resource'});
});

// Routes

app.get('/assets/:bucket/:key', function(req, res) {

  var params = {Bucket: bucket, Key: key};

  S3.getSignedUrl('getObject', params, function(err, url) {
    
    if (err) {
      res.json({error: err.to_json});
    } else {
      res.json({'url': url});
    }

  });

});

// Server

http.createServer(app).listen(8080);