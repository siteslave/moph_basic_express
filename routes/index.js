var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Members = require('../models/members');

/* GET home page. */
router.get('/', function (req, res, next) {
  var fruits = ['Apple', 'Banana', 'Orange']
  res.render('index', { fruits: fruits });
});

router.get('/hello/world', function (req, res, next) {
  var fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' }
  ];

  res.send({ ok: true, fruits: fruits })
  
})
// localhost:8080/welcome/20/30
router.get('/welcome/:a/:b', function (req, res, next) {
  // a = 20, b = 30
  var total = parseInt(req.params.a) * parseInt(req.params.b);
  var message = `${req.params.a} * ${req.params.b} = ${total}`;
  res.send(message);
})
// localhost:8080?id=1&name=Apple
router.get('/detail', function (req, res, next) {
  console.log(req.query)
  var id = req.query.id;
  var name = req.query.name;
  res.send('สวัสดี, ' + name)
})

router.get('/fruits', function (req, res) {
  res.send({ ok: true, msg: 'Welcome to my fruits' });
})

router.post('/fruits', function (req, res) {
  var fruit = req.body.fruit;
  console.log(fruit);
  res.send({ ok: true, fruit: fruit });
})

router.delete('/fruits/:id', function (req, res) {
  console.log('DELETE');
  res.send({ ok: true, msg: `ID: ${req.params.id} DELETED!` });
})


router.get('/members', function (req, res) {
  var db = req.db;

  Members.getList(db)
    .then(function (rows) {
      // succes
      res.send({ ok: true, rows: rows });
    })
    .catch(function (err) {
      // error
      res.send({ ok: false, msg: err });
    });
  
})

router.post('/members', function (req, res) {
  var db = req.db;
  var member = req.body.member;
  member.password = crypto.createHash('md5')
    .update(member.password).digest('hex');
  
  Members.save(db, member)
    .then(function () {
      res.send({ ok: true });
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
  
})

router.put('/members', function (req, res) {
  var db = req.db;

  var member = req.body.member;
   
  Members.update(db, member)
    .then(function () {
      res.send({ ok: true })
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err })
    });
})

router.get('/members/:id', function (req, res) {
  var db = req.db;
  var id = req.params.id;

  Members.detail(db, id)
    .then(function (rows) {
      res.send({ ok: true, member: rows[0] });
      // members = {id: 1, fullname: 'xxx', username: 'xxx', ...}
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
})

router.delete('/members/:id', function (req, res) {
  var id = req.params.id;
  var db = req.db;

  Members.remove(db, id)
    .then(function () {
      res.send({ ok: true })
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err })
    });
})


router.get('/groups', function (req, res) {
  var db = req.db;
  
  Members.getGroups(db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    })
    .catch(function (err) {
      res.send({ ok: false, msg: err });
    });
})


module.exports = router;
