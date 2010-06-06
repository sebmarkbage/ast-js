AST.Expression = new Class({

	Extends: AST.Statement,
	
	cast: function(obj){
		if (obj && typeof obj.toExpression == 'function') obj = obj.toExpression();
		return obj instanceof AST.Expression ? obj : new AST.Literal(obj);
	}

});