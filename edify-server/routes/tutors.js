var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('tutors');

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

router.post('/', function(req, res) {
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
        path: req.body.path
    }, function(err, tutor) {
      if (err)
       throw err;
      res.json(tutor);
    });
  });


  router.put('/:id', function(req, res) {
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
          path: req.body.path
        }
    }, function(err, tutor) {
      if (err)
       throw err;
      res.json(tutor);
    });
  });

  router.delete('/:id', function(req, res) {
    collection.remove({ _id: req.params.id }, function(err, tutor) {
      if (err)
       throw err;
      res.json(tutor);
    });
  });
  

module.exports = router;