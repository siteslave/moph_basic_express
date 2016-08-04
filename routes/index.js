var express = require('express');
var router = express.Router();

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

module.exports = router;
