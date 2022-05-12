var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

var collection = db.get('appointments');

router.get('/', auth, function(req, res) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  var decoded = jwt.verify(token, 'secretkey');

  if(decoded.user_type=="tutor"){
    search = {tutor_id: decoded.person_id}
  } else {
    search = {student_id: decoded.person_id}
  }

  collection.find(search, function(err, appointments) {
    if (err)
    throw err;
    appointments = appointments.filter(app => new Date(app.start_date_time) >= new Date());
    // Sort appointments based on start time
    appointments.sort(function(a,b){
      return new Date(a.start_date_time) - new Date(b.start_date_time);
    });

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

router.post('/', auth, function(req, res) {

  const { tutor_id, student_id, start_date_time, end_date_time, course, notes, status, studentName, tutorName } = req.body;
  let alreadyExists = false;
  if (!(tutor_id && student_id && start_date_time && end_date_time && course && notes && status && studentName && tutorName)) {
    res.send('All fields are required!')
  } else {
    collection.find({ tutor_id: req.body.tutor_id }, function(err, appointments) {
      if (err) {
        throw err;
      }
  
      const startDate = new Date(start_date_time);
      const endDate = new Date(end_date_time);
  
      appointments.forEach(app => {
        if ((startDate >= new Date(app.start_date_time) && startDate < new Date(app.end_date_time)) ||
        (startDate <= new Date(app.start_date_time) && endDate > new Date(app.start_date_time))) {
          res.send('It overlaps with other appointments of the tutor')
          alreadyExists = true;
        }
      });

      if (!alreadyExists) {
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
      }

    })
    
  }
  
});


router.put('/:id', function(req, res) {

  const { tutor_id, student_id, start_date_time, end_date_time, course, notes, status, studentName, tutorName } = req.body;
  let overlaps = false;

  if (!(tutor_id && student_id && start_date_time && end_date_time && course && notes && status && studentName && tutorName)) {
    res.send('All fields are required!')
  } else {
    collection.find({ tutor_id: req.body.tutor_id }, function(err, appointments) {
      if (err) {
        throw err;
      }
  
      const startDate = new Date(start_date_time);
      const endDate = new Date(end_date_time);
  
      appointments.forEach(app => {
        if ((startDate >= new Date(app.start_date_time) && startDate < new Date(app.end_date_time)) ||
        (startDate <= new Date(app.start_date_time) && endDate > new Date(app.start_date_time))) {
          res.send('It overlaps with other appointments of the tutor');
          overlaps = true;
        }
      });

      if (!overlaps) {
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
      }
    })    
  }
  
});

router.delete('/:id', function(req, res) {
  collection.remove({ _id: req.params.id }, function(err, appointments) {
    if (err)
     throw err;
    res.json(appointments);
  });
});

module.exports = router;