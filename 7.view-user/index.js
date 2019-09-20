const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function(req, res) {
	res.render('index', {
		name: 'Newt'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: db.get("users").value()
	});
});

app.get('/users/search', function(req, res) {
	let q = req.query.q;
	let matchedUsers = db.get("users").value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
});

app.get("/users/create", function(req, res) {
	res.render('users/create');
});

app.get("/users/:id", function(req, res) {
	var id = req.params.id;

	var user = db.get('users').find({id:id}).value();

	res.render('users/view', {
		user: user
	});
});

app.post("/users/create", function(req, res) {
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');
})

app.listen(port, () => console.log('Example app listening on port ' + port))