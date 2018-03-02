'use strict';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fes-ho-db');

const User = require('../models/user');


const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const eloipasswordHash = bcrypt.hashSync('123456', salt);
const luispasswordHash = bcrypt.hashSync('789123', salt);

const users = [
  {
    username: 'eloi',
    password: eloipasswordHash
  },
  {
    username: 'luis',
    password: luispasswordHash
  }
];


User.remove({}, (err) => {
  if (err) { throw err; }

    User.create(users, (err, regUsers) => {
      if (err) { throw err; }

      regUsers.forEach(theUser => {
        console.log(`${theUser.username} - ${theUser._id}`);
      });
        mongoose.disconnect();
    });

});
