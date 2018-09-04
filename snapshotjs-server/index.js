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
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app     = express();
const databaseConfig = require('./config/db');

const path = require('path');

//Database Connection
mongoose.Promise = require('bluebird');
/*
mongoose.connect(databaseConfig.database.connectionURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'There is an error while attempting to connect to the database.'));
db.once('open', function() {
  console.log('Successfully connected to the database ' + db.name + '.');
});
*/
//Routes Files
const index = require('./routes/index');

app.use(cors());
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));

//Cors Config
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes Paths
app.use('/', index);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), () => console.log('Running on port ' + app.get('port')));

module.exports = app;
