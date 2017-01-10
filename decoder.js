'use strict';

// var decoder = (function (){
//   var exp = /[a-zA-Z]/
//
//   function decodeText (number, text) {
//     return(exp.test(text));
//   }
//   return {
//     module.exportsdecodeText: decodeText
//   }
// })();

module.exports.decodeText = function (number, text) {
  // var exp = /[a-zA-Z]/;
  // var json = require('./abc.json');
  // var abc = JSON.stringify(json[0].abc);
  // var upperABC = abc.toUpperCase();
  // if (exp.test(text){
  //
  // }else {
  //   return err
  // };



  //solution by Evan Hahn: https://gist.github.com/EvanHahn/2587465

  //it needed some modification. I've tried some approach as you can see above.
  //It was fun. And I want to ask you, how can I use Revealing Module Pattern here.
  //It didn't work.

	var decodedText = '';
  var exp = /[a-zA-Z]/;
  var step = parseInt(number);
	for (var i = 0; i < text.length; i ++) {
		var c = text[i];
    if (exp.test(c)) {
			var code = text.charCodeAt(i);
			if ((code >= 65) && (code <= 90)){
				code = code + parseInt(step);
        if (code < 65) {
          code = 90 + step;
          console.log(code);
        }else if (code > 90){
          code = 60 + step;
        }
      c = String.fromCharCode(code);

			// Lowercase letters
      } else if ((code >= 97) && (code <= 122)) {
        code = code + parseInt(step);
        if (code < 97){
          code = 122 + step;
        }else if (code > 122){
          code = 97 + step;
        }
      c = String.fromCharCode(code);

      }

		}else {
     	throw ('string please');
			return;
    }

		decodedText += c;
	}

	return decodedText;
}
