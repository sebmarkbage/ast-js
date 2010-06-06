AST.Call = new Class({

	Extends: AST.Expression,

	initialize: function(expr, args){
		this.expression = AST.Expression(expr);
		this.arguments = Array.map(args, function(v){
			return AST.Expression(v);
		});
	},

	writeTo: function(write, format){
		this.expression.writeTo(write, format);
		write('(');
		var args = this.arguments;
		if (args.length > 0){
			args[0].writeTo(write, format);
			for (var i = 1, l = args.length; i < l; i++){
				write(', ');
				args[i].writeTo(write, format);
			}
		}
		write(')');
	}

});

AST.New = new Class({

	Extends: AST.Call,

	writeTo: function(write, format){
		write('new ');
		this.parent(write, format);
	}

});

AST.Expression.implement({

	call: function(){
		return new AST.Call(this, arguments);
	},

	construct: function(){
		return new AST.New(this, arguments);
	}

});
