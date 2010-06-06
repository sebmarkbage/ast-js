(function(){

AST.Operator = new Class({

	Extends: AST.Expression,

	initialize: function(left, operator, right){
		this.left = AST.Expression(left);
		this.operator = operator;
		this.right = AST.Expression(right);
	},

	writeTo: function(write, format){
		this.left.writeTo(write, format);
		write(' ' + this.operator + ' ');
		this.right.writeTo(write, format);
	}

});

AST.Not = new Class({

	Extends: AST.Expression,

	initialize: function(expr){
		this.expression = expr;
	},

	writeTo: function(write, format){
		write('!');
		this.expression.writeTo(write, format);
	}

});

AST.Expression.implement('not', function(){
	return new AST.Not(this);
});

var operators = {

	Equals: '==',
	NotEquals: '!=',
	StrictEquals: '===',
	StrictNotEquals: '!==',
	LessThan: '<',
	MoreThan: '>',
	LessThanOrEquals: '<=',
	MoreThanOrEquals: '>=',

	And: '&&',
	Or: '||',

	BitwiseAnd: '&',
	BitwiseOr: '|',
	BitwiseXor: '^',
	
	LeftShift: '<<',
	RightShift: '>>',
	ZeroFillRightShift: '>>>',

	Add: '+',
	Subtract: '-',
	Multiply: '*',
	Divide: '/',
	Mod: '%'

};

for (var key in operators) (function(name, cname, op){

	AST[name] = new Class({

		Extends: AST.Operator,

		initialize: function(left, right){
			this.parent(left, op, right);
		}

	});

	AST.Expression.implement(cname, function(expr){
		return new AST[name](this, expr);
	});

})(key, key.substr(0, 1).toLowerCase() + key.substr(1), operators[key]);

})();