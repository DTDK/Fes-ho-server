const express = require('express');
const router = express.Router();

const List = require('../models/list');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

});

router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const listName = req.body.list; 
  
  const newlist = new List({
    name: listName
  });
  
  newlist.save()
    .then((list) => {
      const userId = req.session.currentUser._id;
      User.findByIdAndUpdate(userId, { $push: { lists: list._id } })
        .then(() => {
          return res.json(list);
        })
    })
    .catch(next);
});



module.exports = router;