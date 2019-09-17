const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let users = [
	{ id: 1, name: 'Truc' },
	{ id: 2, name: 'Nhan' },
	{ id: 3, name: 'Bao' },
	{ id: 4, name: 'Chau' }
];

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Newt'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: users
	});
});

app.get('/users/search', function(req, res) {
	let q = req.query.q;
	let matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
});

app.get("/users/create", function(req, res) {
	res.render('users/create');
});

app.post("/users/create", function(req, res) {
	users.push(req.body);
	res.redirect('/users');
})

app.listen(port, () => console.log('Example app listening on port ' + port))