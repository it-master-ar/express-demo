const mongoose = require('mongoose');
const config   = require('./config');

const userSchema = require('./schema/user');

class DB {
  constructor() {
    this.mongoose = mongoose;
    this._setupSchemas();
  }

  connect(done) {
    this.mongoose.connect(config.mongo, (err) => {
      if (err) { return done(err); }

      console.log('Connected db...');
      done(null);
    })
  }

  disconnect(done) {
  this.mongoose.disconnect((err) => {
    if (err) { return cb(err); }
    console.log('Disconnected db...');

    done(null);
  });
}

  _setupSchemas() {
    this.mongoose.model('User', userSchema);
  }
};

module.exports = new DB();
