var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('users');
var studentCollection = db.get('students');
var tutorCollection = db.get('tutors');

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { response } = require('express');


const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Protected route
router.get('/welcome', auth, function(req, res) {
  res.render('index', { title: 'Express' });
})

router.post('/register', (req, res) => {
  let {email, password, user_type, bio, courses, phone_number, first_name, last_name } = req.body;
  let person_id;
  if (!(email && password)) {
    res.status(400).json({error: "All fields are required!"});
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;

      if (user) {
        res.status(400).json({error: "User already exists!!"});
        
        res.send("User already exists. Please login!");
      } else {
        //Hashing password
        password = crypto.createHash('sha1').update(password).digest('hex');
        let newUser = {
          email,
          password,
          user_type // encrypt before storing
        }
        collection.insert(newUser, function (err3, user) {
          if (err3) throw err3;
          let user_id=user._id;
          if(user_type=="student"){
            let studentDocument = {};
            studentDocument.email=user.email;
            studentDocument.user_id=user_id;

            studentDocument.bio=bio;
            studentDocument.phone_number=phone_number;
            studentDocument.first_name=first_name;
            studentDocument.last_name=last_name;


            studentCollection.insert(studentDocument, (err2, student) => {
              if (err2) {
                console.log(`Inside insert`)

                throw err2;
              }

              studentCollection.findOne({email: user.email}, function(err4, student) {
              console.log('Inside get tutor')
              person_id = student._id
              user.person_id=person_id;
              console.log(`The id is ${person_id}`);

              collection.update({
                    email: user.email
                }, {
                    $set: {
                      email: user.email,
                      person_id: person_id
                    }
                }, function(err, user) {
                  if (err)
                  throw err;
                });
              var token = jwt.sign({user_id: user_id, person_id: user.person_id, email, user_type:user_type}, 'secretkey');

              if (token) {
                user.token = token;
              }

              delete(user['password']);
              delete(user['_id']);

              res.json(user);
            })
          });
          }else{
            let tutorDocument = {};
            tutorDocument.email=user.email;
            tutorDocument.user_id=user_id;

            tutorDocument.bio=bio;
            tutorDocument.courses=courses;
            tutorDocument.phone_number=phone_number;
            tutorDocument.first_name=first_name;
            tutorDocument.last_name=last_name;
            tutorDocument.total_tutoring_hours=0;
            tutorDocument.path="person"+(Math.random() * (10 - 4) + 4)+'.jpg';

            tutorCollection.insert(tutorDocument, (err1, tutor) => {
              if (err1) {
                console.log(`Inside insert`)

                throw err1;
              }

            tutorCollection.findOne({email: user.email}, function(err4, tutor) {
              console.log('Inside get tutor')
              person_id = tutor._id
              user.person_id=person_id;
              console.log(`The id is ${person_id}`);

              collection.update({
                    email: user.email
                }, {
                    $set: {
                      email: user.email,
                      person_id: person_id
                    }
                }, function(err, user) {
                  if (err)
                  throw err;
                });
                
              var token = jwt.sign({user_id: user_id, person_id: user.person_id, email, user_type:user_type}, 'secretkey');

              if (token) {
                user.token = token;
              }

              delete(user['password']);
              delete(user['_id']);

              res.json(user);
            })
          });
          }
        })
      }
    })
  }
})

router.post('/login', function(req, res) {
  let { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).json({error: "All fields are required!"});
  } else {
    collection.findOne({email: email}, function (err, user) {
      if (err) throw err;

      if (user == null) {
        res.status(404).json({error: "User doesn't exist"});
      } else {
        password = crypto.createHash('sha1').update(password).digest('hex');
        if (user.password === password) { // Should be encrypted and then checked.
          var token = jwt.sign({user_id: user._id, person_id: user.person_id, email, user_type: user.user_type}, 'secretkey');
          user.token = token;

          delete(user['password'])
          delete(user['_id'])
          res.json(user);
        } else {
          res.status(400).json({error: "User email or password is incorrect!"});
        }
      }
    });
  }
})


module.exports = router;
