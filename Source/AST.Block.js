AST.Block = new Class({

	initialize: function(){
		this.statements = Array.slice(arguments);
	},
	
	cast: function(obj){
		if (obj instanceof AST.Block) return obj;
		var block = new AST.Block();
		if (Object.prototype.toString.call(obj) == '[object Array]')
			block.statements = Array.slice(obj);
		else
			block.statements = [obj];
		return block;
	},

	writeTo: function(writer, format, curly){
		var body = this.statements;
		if (!body || !body.length) return;
		for (var i = 0, l = body.length; i < l; i++){
			var expr = body[i];
			if (!(expr instanceof AST.Statement)) body[i] = expr = new AST.Literal(expr);
			expr.writeTo(writer, format);
			writer(';\n');
		}
	},

	toString: function(format){
		var output = [];
		this.writeTo(function(str){
			output.push(str);
		}, format);
		return output.join('');
	}

});

AST.implement({ Extends: AST.Block });