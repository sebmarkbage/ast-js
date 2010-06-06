AST.Ternary = new Class({

	Extends: AST.Expression,

	initialize: function(condition, then, els){
		this.condition = AST.Expression(condition);
		this.then = AST.Expression(then);
		this.els = AST.Expression(els);
	},

	writeTo: function(write, format){
		this.condition.writeTo(write, format);
		write(' ? ');
		this.then.writeTo(write, format);
		write(' : ');
		this.els.writeTo(write, format);
	}

});

AST.If = new Class({

	Extends: AST.Statement,

	initialize: function(condition, then, els){
		this.condition = condition;
		this.then = then;
		this.els = els;
	},

	writeTo: function(write, format){
		write('if (');
		this.condition.writeTo(write, format);
		write(')');
		this.then.writeTo(write, format);
		if (this.els){
			write(' else ');
			this.els.writeTo(write, format);
		}
	}

});