const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//Get All index
router.post('/', indexController.getIndex);

module.exports = router;
