require('dotenv').config();

// console.log(process.env.SESSION_SECRET);

const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const prodRoute = require('./routes/prod.route');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const port = 3000;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(sessionMiddleware);
app.use(csurf({ cookie: true }));

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
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => console.log('Example app listening on port ' + port))