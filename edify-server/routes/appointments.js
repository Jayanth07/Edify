var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('appointments');

router.get('/', function(req, res) {
  collection.find({}, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointments);
  });
});

router.get('/:id', function(req, res) {
  collection.find({ _id: req.params.id }, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointment);
  });
});

router.post('/', function(req, res) {
  collection.insert({
    tutor_id: req.body.tutor_id,
    student_id: req.body.student_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    course: req.body.course,
    notes: req.body.notes,
    status: req.body.status,
    student_name: req.body.student_name,
    tutor_name: req.body.tutor_name
  }, function(err, tutor) {
    if (err)
     throw err;
    res.json(appointment);
  });
});


router.put('/:id', function(req, res) {
  collection.update({
      _id: req.params.id
  }, {
      $set: {
        tutor_id: req.body.tutor_id,
        student_id: req.body.student_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        course: req.body.course,
        notes: req.body.notes,
        status: req.body.status,
        student_name: req.body.student_name,
        tutor_name: req.body.tutor_name
      }
  }, function(err, tutor) {
    if (err)
     throw err;
    res.json(appointment);
  });
});

router.delete('/:id', function(req, res) {
  collection.remove({ _id: req.params.id }, function(err, tutor) {
    if (err)
     throw err;
    res.json(appointment);
  });
});

module.exports = router;