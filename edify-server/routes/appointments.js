var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const { append } = require('express/lib/response');

var collection = db.get('appointments');
var studentCollection = db.get('students');

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

  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  var decoded = jwt.verify(token, 'secretkey');
  let student_id = decoded.person_id;

  const { tutor_id, start_date_time, end_date_time, course, notes, status, tutorName } = req.body;
  let alreadyExists = false;
  if (!(tutor_id && student_id && start_date_time && end_date_time && notes && status && tutorName)) {
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
        let student_name;

        studentCollection.findOne({_id: student_id}, function(err, student){
        if (err)
        throw err;
        if(student){
          student_name=student.first_name + " " + student.last_name;
        }

        collection.insert({
          tutor_id: req.body.tutor_id,
          student_id: student_id,
          start_date_time: req.body.start_date_time,
          end_date_time: req.body.end_date_time,
          course: req.body.course,
          notes: req.body.notes,
          status: req.body.status,
          studentName: student_name,
          tutorName: req.body.tutorName
        }, function(err, appointments) {
          if (err)
          throw err;
          res.json(appointments);
        });
      });

      }
    }) 
  }
});



router.post('/currentappointments/', auth, function(req, res) {
  let available_times={
    1:'8 AM - 9 AM',
    2:'9 AM - 10 AM',
    3:'10 AM - 11 AM',
    4:'11 AM - 12 PM',
    5:'12 PM - 1 PM',
    6:'1 PM - 2 PM',
    7:'2 PM - 3 PM',
    8:'3 PM - 4 PM',
    9:'4 PM - 5 PM'
     };
  const { tutor_id, selected_date, token } = req.body;
  if (!(tutor_id && selected_date && token)) {
    res.send('All fields are required!')
  } else {
    collection.find({ tutor_id: tutor_id }, function(err, appointments) {
      if (err)
      throw err;
      let selected_dt=new Date(selected_date+"T12:00:00.000Z");
      appointments = appointments.filter(app => new Date(app.start_date_time).toDateString() == selected_dt.toDateString());
      // Sort appointments based on start time
      appointments.sort(function(a,b){
        return new Date(a.start_date_time) - new Date(b.start_date_time);
      });

      for(var key in appointments){
        let dt=new Date(appointments[key]['start_date_time']);
        dt=dt.getHours();
        dt=dt-7;
        if(available_times[dt]){
          delete available_times[dt];
        }
      }

      res.json(Object.values(available_times));
    });
    
  }
  
});

router.put('/:id', auth, function(req, res) {

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