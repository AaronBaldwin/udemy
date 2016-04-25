var express = require('express');
var app = express();

//Get corresponds to the http verb
//app.get('/', function(req, res) {
//  res.send('Hello Express\n');
//});

var port = 3000;

app.get('/about/', function(req, res) {
  res.send('About us!')
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('Express started on port ' + port);
});
