var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/edify");

var collection = db.get("students");

router.get("/", function (req, res) {
  collection.find({}, function (err, students) {
    if (err) throw err;
    res.json(students);
  });
});

router.get("/:id", function (req, res) {
  collection.find({ _id: req.params.id }, function (err, students) {
    if (err) throw err;
    res.json(students);
  });
});

router.post("/", function (req, res) {
  const { first_name, last_name, bio, mobile, email } = req.body;

  if (!(first_name && last_name && bio && mobile && email)) {
    res.send("All fields are required!");
    res.status(400);
  } else {
    collection.findOne({ email: email }, function (err, student) {
      if (err) throw err;
      console.log(student);
      if (student) {
        res.send("An account for this email already exists, please login!");
        res.status(400);
      } else {
        collection.insert(
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            mobile: req.body.mobile,
            email: req.body.email,
            totalTutoringHours: 0,
          },
          function (err, student) {
            if (err) throw err;
            res.json(student);
          }
        );
      }
    });
  }
});

router.put("/:id", function (req, res) {
  const { first_name, last_name, bio, mobile, email, totalTutoringHours } =
    req.body;

  if (
    !(first_name && last_name && bio && mobile && email && totalTutoringHours)
  ) {
    res.send("All fields are required!");
    res.status(400);
  } else {
    collection.update(
      {
        _id: req.params.id,
      },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          bio: req.body.bio,
          mobile: req.body.mobile,
          email: req.body.email,
          totalTutoringHours: totalTutoringHours,
          path: req.body.path,
        },
      },
      function (err, student) {
        if (err) throw err;
        res.json(student);
      }
    );
  }
});

router.delete("/:id", function (req, res) {
  collection.remove({ _id: req.params.id }, function (err, student) {
    if (err) throw err;
    res.json(tutor);
  });
});

module.exports = router;
