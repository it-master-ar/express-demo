const express = require('express');
const router  =  new express.Router();

const db   = require('../lib/db');
const User = db.mongoose.model('User');

function getUsers(req, res) {

  User.find()
    .exec()
    .then((err, users) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json(users);
    });
}

function getUserById(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });
}

function createUser(req, res) {
  const user = new User(req.body);

  user.save((err, u) => {
    if (err) {
      return res.send(500, err);
    }

    res.send(u);
  });
}


router.get('/',    getUsers);
router.post('/',   createUser);
router.get('/:id', getUserById);


module.exports = router;
