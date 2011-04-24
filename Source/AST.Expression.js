AST.Expression = function(obj){
	if (!obj) return;
	if (typeof obj.toExpression == 'function') obj = obj.toExpression();
	return obj instanceof AST.Expression ? obj : new AST.Literal(obj);
};

AST.Expression.prototype = new AST.Statement();
