AST.Variable = new Class({

	Extends: AST.Expression,

	initialize: function(name){
		this.name = name;
	},

	writeTo: function(write){
		write(this.name);
	}

});

AST.This = new Class({

	Extends: AST.Expression,

	writeTo: function(write){
		write('this');
	}

});