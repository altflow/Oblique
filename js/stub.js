/**
 * stub function
 */
var stubFn = function(){
	var fn = function(){
		fn.called = true;
	};
	
	fn.called = false;
	
	return fn;
};

