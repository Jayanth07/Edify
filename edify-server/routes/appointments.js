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
    res.json(appointments);
  });
});

router.post('/', function(req, res) {
  collection.insert({
    tutor_id: req.body.tutor_id,
    student_id: req.body.student_id,
    start_date_time: req.body.start_date_time,
    end_date_time: req.body.end_date_time,
    course: req.body.course,
    notes: req.body.notes,
    status: req.body.status,
    studentName: req.body.studentName,
    tutorName: req.body.tutorName
  }, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointments);
  });
});


router.put('/:id', function(req, res) {
  collection.update({
      _id: req.params.id
  }, {
      $set: {
        tutor_id: req.body.tutor_id,
        student_id: req.body.student_id,
        start_date_time: req.body.start_date_time,
        end_date_time: req.body.end_date_time,
        course: req.body.course,
        notes: req.body.notes,
        status: req.body.status,
        studentName: req.body.studentName,
        tutorName: req.body.tutorName
      }
  }, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointments);
  });
});

router.delete('/:id', function(req, res) {
  collection.remove({ _id: req.params.id }, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointments);
  });
});

module.exports = router;