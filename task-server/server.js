var _ = require('lodash');
var bodyparser = require('body-parser');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var todoNextId = 1;

var todos = [];

app.use(function(req, res, next) {
  console.log('hello middleware');
  next();
});

app.use(bodyparser.json());

app.get('/', function (req, res) {
  console.log('Called main directory');
  res.send('TODO: fill in main list call');
});

app.get('/todos', function (req, res) {
	return res.json(todos);
});

app.get('/todos/:id', function (req, res) {
	var id = parseInt(req.params.id);
	var todo = _.find(todos, function (todo){return todo.id === id;});
	if (todo)
	  return res.json(todo);
	else
	  return res.status(404).send();
});

app.get('/redirect', function (req, res){
  res.status(301).redirect('http://boards.4chan.org/pol/');
});

app.post('/todos', function (req, res) {
  var body = req.body;
  body = _.pick(body, ['completed', 'description']);

  if(!_.isBoolean(body.completed) || !_.isString(body.description)) {
    return res.status(400).send();
  }
  _.set(body, 'description', _.trim(body.description));

  _.set(body, 'id', todoNextId++);
  todos.push(body);
  res.json(body);
});

app.listen(port, function() {
  console.log('App started, callback here:', port);
});
