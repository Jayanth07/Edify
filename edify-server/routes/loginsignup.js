var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk('localhost:27017/edify');

var collection = db.get('users');

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
  let { username, email, password, user_type } = req.body;
  if (!(username && email && password)) {
    res.send('All fields are required!');
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;

      if (user) {
        res.send("User already exists. Please login!");
      } else {
        //Hashing password
        password = crypto.createHash('sha1').update(password).digest('hex');
        let newUser = {
          username,
          email,
          password,
          user_type // encrypt before storing
        }
        collection.insert(newUser, function (err, user) {
          if (err) throw err;
          var token = jwt.sign({user_id: user._id, email, user_type:user_type}, 'secretkey');

          if (token) {
            user.token = token;
          }
          delete(user['password'])
          delete(user['_id'])
          res.json(user);
        })
      }
    })
  }
})

router.post('/login', function(req, res) {
  let { email, password } = req.body;

  if (!(email && password)) {
    res.send('All fields are required!');
  } else {
    collection.findOne({email: email}, function (err, user) {
      if (err) throw err;

      if (user == null) {
        res.send("User doesn't exist");

      } else {
        password = crypto.createHash('sha1').update(password).digest('hex');
        if (user.password === password) { // Should be encrypted and then checked.
          var token = jwt.sign({user_id: user._id, email, user_type: user.user_type}, 'secretkey');
          user.token = token;

          delete(user['password'])
          delete(user['_id'])
          res.json(user);
        } else {
          res.send("User email or password is incorrect!");
        }
      }
    });
  }
})

module.exports = router;
