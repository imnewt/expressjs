// require('dotenv').config();

// console.log(process.env.SESSION_SECRET);

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const prodRoute = require('./routes/prod.route');
const cartRoute = require('./routes/cart.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const port = 3000;

const app = express()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Newt'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', prodRoute);
app.use('/cart', cartRoute);


app.listen(port, () => console.log('Example app listening on port ' + port))