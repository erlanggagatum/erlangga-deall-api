var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Respond to POST request on the root route (/), the application’s home page: */
router.post('/', function(req, res, next) {
  console.log(req.body)
  const id = req.body.id
  const id2 = req.query.id
  res.send('Got a POST request ' + id + " " + id2)
})

/* Respond to a PUT request to the /user route: */
router.put('/', function(req, res, next) {
  res.send('Got a PUT request')
})

/* Respond to a DELETE request to the /user route: */
router.delete('/', function(req, res, next) {
  res.send('Got a DELETE request')
})

module.exports = router;
