require('dotenv').config();
const server = require('./server');
const db = require('./db');

db.connect((err) => {
  if (err) {
    return console.log('BD is not working...');
  }

  server.start();
});
