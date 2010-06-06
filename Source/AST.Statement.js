AST.Statement = new Class({

	initialize: function(label){
		this.label = label;
	},

	writeTo: function(compressed){ },

	toString: function(compressed){
		var output = [];
		this.writeTo(function(str){
			output.push(str);
		}, compressed);
		return output.join('');
	}

});

AST.Return = new Class({

	Extends: AST.Statement,

	initialize: function(expr){
		if (arguments.length) this.expression = AST.Expression(expr);
	},

	writeTo: function(write, format){
		write('return');
		if (!this.expression) return;
		write(' ');
		this.expression.writeTo(write, format);
	}

});

AST.Break = new Class({

	Extends: AST.Statement,

	writeTo: function(write, format){
		write('break');
	}

});
