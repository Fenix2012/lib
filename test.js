//function A(a, b, c) {
//  var ar = [a, b, c];
//  return function B(i) {
//    return ar[i];
//  };
//}
// 
//var b = A('Here', 'I', 'am');
//console.log( b(1) );
//-------------------------------
//(function(){
//	var s = 'hello';
//	s.substring(1, 4);
//	//console.log(s);
//})();
//----------------------
//(function(){
	function Sum(a, b) { return a + b; }
	var inc = Sum.bind(null, 1); // 将形参a绑定为1,this绑定为null
//})();
