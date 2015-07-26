var models = require('../models/models.js');

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show' , { quiz: quiz});
	})
};

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Correcto¡¡'});
		}else{
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Incorrecto¡¡'});
		}
	});
};

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes});
	});
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