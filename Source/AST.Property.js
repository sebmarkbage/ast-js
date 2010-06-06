AST.Property = new Class({

	Extends: AST.Expression,

	initialize: function(expr, name){
		this.expression = AST.Expression(expr);
		this.name = AST.Expression(name);
	},

	writeTo: function(write, format){
		this.expression.writeTo(write, format);
		if (this.name instanceof AST.Literal && this.name.value){
			write('.');
			write(String(this.name.value));
			return;
		}
		write('[');
		this.name.writeTo(write, format);
		write(']');
	}

});

AST.Expression.implement('property', function(name){

	return new AST.Property(this, name);

});