var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('tutors');

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

router.get('/', function(req, res) {
  collection.find({}, function(err, tutors) {
    if (err)
     throw err;
    res.json(tutors);
  });
});

router.get('/:id', function(req, res) {
  collection.find({ _id: req.params.id }, function(err, tutors) {
    if (err)
     throw err;
    res.json(tutors);
  });
});

router.post('/details', function(req, res) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  let decoded = jwt.verify(token, 'secretkey');

  collection.findOne({ _id: decoded.person_id }, function(err, tutor) {
    if (err)
     throw err;
    res.json(tutor);
  });
});

router.post('/', function(req, res) {

  const { first_name, last_name, bio, courses, location, rating, phone_number, email, DOB, certificates, path } = req.body;

  if (!(first_name && last_name && bio && courses && location && rating && phone_number && email && DOB && certificates && path)) {
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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            courses: req.body.courses,
            location: req.body.location,
            rating: req.body.rating,
            phone_number: req.body.phone_number,
            email: req.body.email,
            DOB: req.body.DOB,
            certificates: req.body.certificates,
            totalTutoringHours: 0,
            path: req.body.path
        }, function(err, tutor) {
          if (err)
           throw err;
          res.json(tutor);
        });
      }
    })
  }  
  });


  router.put('/:id', function(req, res) {
    
  const { first_name, last_name, bio, courses, location, rating, phone_number, email, DOB, certificates, path, totalTutoringHours } = req.body;

  if (!(first_name && last_name && bio && courses && location && rating && phone_number && email && DOB && certificates && path && totalTutoringHours)) {
    res.send('All fields are required!')
    res.status(400)
  } else {
    collection.update({
        _id: req.params.id
    }, {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          bio: req.body.bio,
          courses: req.body.courses,
          location: req.body.location,
          rating: req.body.rating,
          phone_number: req.body.phone_number,
          email: req.body.email,
          DOB: req.body.DOB,
          certificates: req.body.certificates,
          totalTutoringHours: totalTutoringHours,
          path: req.body.path
        }
    }, function(err, tutor) {
      if (err)
       throw err;
      res.json(tutor);
    });
  }
  });

  router.delete('/:id', function(req, res) {
    collection.remove({ _id: req.params.id }, function(err, tutor) {
      if (err)
       throw err;
      res.json(tutor);
    });
  });
  

module.exports = router;