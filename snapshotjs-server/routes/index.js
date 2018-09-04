/*
* SnapshotJS - index.js
* Designed and Developed by Eric Liang
* Author: Eric Liang
* Author URL: https://www.eric-liang.com
* Author Github: https://www.github.com/ewliang
* Repository: https://github.com/ewliang/SnapshotJS-Website-Screencapture-Tool
* License: MIT License
*/

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

//Get All index
router.post('/', indexController.getIndex);

module.exports = router;
