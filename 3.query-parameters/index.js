const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

let users = [
	{ id: 1, name: 'Truc' },
	{ id: 2, name: 'Nhan' },
	{ id: 3, name: 'Bao' },
	{ id: 4, name: 'Chau' }
]

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

app.listen(port, () => console.log('Example app listening on port ' + port))