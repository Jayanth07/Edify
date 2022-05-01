var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('users');

router.get('/', function(req, res) {
  collection.find({}, function(err, tutors) {
    if (err)
     throw err;
    res.json(tutors);
  });
});

router.post('/', function(req, res) {

  const { email, password } = req.body;

  if (!(email && password)) {
    res.send('All fields are required!')
    res.status(400);
  } else {
    collection.find({email: email}, function(err, tutor) {
      if (err)
        throw err;
  
      if (tutor) {
        res.send('An account for this email already exists, please login!')
        res.status(400);
      } else {
        collection.insert({
            email,
            password: hash(password) // Password should be hashed in the UI and sent via network
        }, function(err, user) {
          if (err)
           throw err;
          res.json(user);
        });
      }
    })
  }  
  });


  router.put('/:id', function(req, res) {
    
  const { email, password } = req.body;

  if (!(email && password)) {
    res.send('All fields are required!')
    res.status(400)
  } else {
    collection.update({
        email: email
    }, {
        $set: {
          email: email,
          password: password
        }
    }, function(err, user) {
      if (err)
       throw err;
      res.json(user);
    });
  }
  });

  router.delete('/:id', function(req, res) {
    collection.remove({ _id: req.params.id }, function(err, user) {
      if (err)
       throw err;
      res.json(user);
    });
  });
  

module.exports = router;