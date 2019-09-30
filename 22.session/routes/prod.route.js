var express = require('express');

var controller = require('../controllers/prod.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;