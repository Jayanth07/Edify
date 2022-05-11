var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

const jwt = require('jsonwebtoken');
var collection = db.get('feedbacks');

router.get('/', function(req, res) {
  collection.find({}, function(err, feedbacks) {
    if (err)
     throw err;
    res.json(feedbacks);
  });
});

router.get('/:id', function(req, res) {
  collection.find({ _id: req.params.id }, function(err, feedback) {
    if (err)
     throw err;
    res.json(feedback);
  });
});

router.post('/', function(req, res) {

  const { rating, comment, token, tutor_id } = req.body;



  if (!(rating && comment && token && tutor_id)) {
    res.send('All fields are required!')
    res.status(400);
  } else {
    token_obj=jwt.verify(token, 'secretkey');
    console.log(token_obj);

    let email=token_obj.email;
    let user_type=token_obj.user_type;
    let student_id=token_obj.person_id;
    collection.find({tutor_id: tutor_id}, function(err, feedback) {
      if (err)
        throw err;
  
      if (feedback) {
        feedback.comments=feedback.comments.push({"student_id": student_id , "rating": rating, "comment": comment});
        collection.update({_id:feedback._id},
          {$set: {
          count: feedback.count+1,
          avg_rating: (feedback.avg_rating*feedback.count+feedback.rating)/(feedback.count+1),
          comments: feedback.comments
        }
        }, function(err, feedback) {
          if (err)
          throw err;
          res.json(feedback);
        });
      } else {
        collection.insert({
            tutor_id: tutor_id,
            count: 1,
            avg_rating: rating,
            comments: [{"student_id": student_id , "rating": rating, "comment": comment}]
        }, function(err, feedback) {
          if (err)
           throw err;
          res.json(feedback);
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