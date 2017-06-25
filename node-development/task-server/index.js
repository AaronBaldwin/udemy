'use strict';

var express = require('express');
var app = express();
var middleware = require('./middleware.js');
var _ = require('lodash');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var port = process.env.PORT || 3000;

var todos = [];
var nextId = 0;



app.use(middleware.logger);

app.get('/todo', function(req, res) {
  res.json(todos);
});

app.get('/todo/incomplete', function(req, res) {
  res.json(_.filter(todos, todo => !todo.completed));
});

app.get('/todo/:id', function(req, res) {
  let todoById = _.find(todos, todo => todo.id == req.params.id);
  if(todoById)
    res.json(todoById);
  else
    res.status(404).send();
});

app.put('/todo/:id/completed', function(req, res) {
  let todoIndex = _.findIndex(todos, todo => todo.id == req.params.id);
  todos[todoIndex].completed = true;
  res.json(todos[todoIndex]);
});

app.delete('/todo/:id', function(req, res) {
  let todoIndex = _.findIndex(todos, todo => todo.id == req.params.id);
  if(todoIndex >= 0) {
    todos.splice(todoIndex, 1);
	res.status(200).send();
  }
  else {
    res.status(404).send();
  }
});

app.post('/todo', function(req, res) {
  let task = req.body.task;
  todos.push({
    task,
	completed: false,
	id: nextId++,
  });
  res.json(todos);
});



app.listen(port, function() {
  console.log('Express started on port ' + port);
});
