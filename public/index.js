'use strict';

var control = (function (){
  var root = document.querySelector('main')
  var submitButton = root.querySelector('button');
  var text = root.querySelector('textarea');
  var shiftNumber = root.querySelector('input');

  function sendCodedText () {
    submitButton.addEventListener('click', function(){

      var loadingText = document.createElement('p');
      loadingText.className = 'loading';
      loadingText.innerText = 'LOADING!'
      root.appendChild(loadingText);

      ajax.send(shiftNumber.value, text.value, function(res){
        root.removeChild(loadingText);
        renderText(res);
      });
    });
  }

  function renderText(text){
    var decodedText = document.createElement('p');
    loadingText.className = 'decoded-text';
    loadingText.innerText = text.text
    root.appendChild(decodedText);
  }


  return {
    init: sendCodedText
  }

})();

var ajax = (function (){

  var APIEndpoint = 'http://localhost:3000/';

  function get (callback){
    open('GET', 'decode/all', false, callback);
  }

  function send (number, text, callback){
    var data = {shift: number, text: text};
    open('POST', 'decode', data, callback);
  }


  function open (method, resource, data, callback){
    var xhr = new XMLHttpRequest();
		data = (data) ? data : null;
		xhr.open( method, APIEndpoint + resource );
    console.log(data)
		xhr.send( JSON.stringify(data) );
		xhr.onreadystatechange = function (rsp) {
			if( xhr.readyState === XMLHttpRequest.DONE ) {
				callback( JSON.parse(xhr.response) );
			}
    }
  }
  return {
    send: send
  }

})();
