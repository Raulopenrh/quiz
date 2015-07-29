var models = require('../models/models.js');

//Autoload - MW que gestiona la lectura y los casos de error.
exports.load = function(req, res, next, quiId){
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error){ next(error);});
}

exports.show = function(req, res){
	res.render('quizes/show' , { quiz: req.quiz});
}

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto¡¡';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes});
	}).catch(function(error){ next(error);});
};

exports.buscar = function(req, res){
	models.Quiz.findAll({where: ["pregunta like ?", "%"+req.query.search+"%"]}).then(function(quizes){
		if (quizes.length > 0 && req.query.search !== ""){
			res.render('quizes/index' , { quizes: quizes});
		}else{
			res.render('quizes/resultado', {respuesta: 'Ningun registro encontrado'});
		}
	})
}