var models = require('../models/models.js');
var datos = {};

function consultas(callback){
	models.Quiz.count().then(function(result){
		datos.preguntas = result;
	});
	models.Comment.count().then(function(result){
		datos.comentarios = result;
		callback(datos);
	});
};

exports.show = function(req, res){
	consultas(function(datos){
		res.render('quizes/statistics', {datos: datos, errors: []});	
	});
};