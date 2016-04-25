var express = require('express');
var app = express();
var middleware = require('./middleware.js');

var port = 3000;

app.use(middleware.logger);

app.get('/about/', middleware.auth, function(req, res) {
  res.send('About us!')
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('Express started on port ' + port);
});
