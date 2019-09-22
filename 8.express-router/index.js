const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route')
const db = require('./db');

const port = 3000;

const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function(req, res) {
	res.render('index', {
		name: 'Newt'
	});
});

app.use('/users', userRoute);


app.listen(port, () => console.log('Example app listening on port ' + port))