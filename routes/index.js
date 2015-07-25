var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', function(req, res){
	res.render('author');
});
router.get('/vistaBuscar', function(req, res){
	res.render('quizes/vistaBuscar');
});
module.exports = router;