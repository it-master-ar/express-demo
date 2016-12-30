const express = require('express');

const morgan     = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config');

const userRouter = require('../routes/user');
const rootRouter = require('../routes/root');

class Server {
  constructor() {
    this.app  = express();
    this.port = config.port;
    this.config = config;

    this._setupMiddlewares();
    this._setupRoutes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Listening at port ${this.port}`);
    });
  }

  _setupRoutes() {
    this.app.use('/', rootRouter);
    this.app.use('/user', userRouter);
  }

  _setupMiddlewares() {
    this.app.use(
      morgan(config.morgan, {})
    );
    this.app.use(bodyParser.json());
  }
}

module.exports = new Server();
