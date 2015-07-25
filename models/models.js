var path = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(null,null,null,
							 {dialect: "sqlite", sttorage: "quiz.sqlite"}
				);
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
		if(count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'			  
						});
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
