AST.Function = new Class({

	Extends: AST.Expression,

	initialize: function(name, args, variables, statements){
		if (typeof name != 'string'){
			statements = variables;
			variables = args;
			args = name;
			name = null;
		}
		if (statements instanceof AST.Expression) statements = new AST.Return(statements);
		statements = AST.Block(statements);
		this.name = name;
		this.arguments = args;
		this.statements = statements;
		this.variables = variables;
	},

	writeTo: function(write, format){
		write(this.name ? 'function ' + this.name + '(' : 'function(');
		if (this.arguments){
			for (var i = 0, l = this.arguments.length; i < l; i++){
				if (i > 0) write(', ');
				write(this.arguments[i].name);
			}
		}
		write('){\n');
		this.statements.writeTo(write, format);
		write('}');
	},

	compile: function(){
		var args = this.arguments.map(function(arg){ return arg.name; }),
			body = [];

		this.statements.writeTo(function(str){ body.push(str); });
		args.push(body.join(''));

		return Function.apply(Function, args);
	}

});