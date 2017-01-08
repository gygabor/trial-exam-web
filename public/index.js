'use strict';

var control = (function (){
  var submitButton = document.querySelector('button');
  var text = document.querySelector('textarea');
  var shiftNumber = document.querySelector('input');

  function sendOrigText () {
    submitButton.addEventListener('click', function(){
      ajax.send(text.value, shiftNumber.value, function(res){
      });
    });
  }

  // function playTrack (){
  //   if (audio.paused()){
  //     playButton.style.background = 'url(img/pause.svg) no-repeat';
  //     playButton.style.backgroundPosition = 'center'
  //     audio.play();
  //   } else {
  //     playButton.style.background = 'url(img/play.svg) no-repeat';
  //     playButton.style.backgroundPosition = 'center'
  //     audio.pause();
  //   }
  // }
  //
  // function loadTrack (url){
  //   audio.load(url);
  //   playTrack();
  // };
  return {
    init: sendOrigText
  }

})();

var ajax = (function (){

  var APIEndpoint = 'http://localhost:3000/';

  function send (text, number, callback){
    var data = {"shift": number, "text": text};
    open('POST', '/decode', data, callback);
  }

  function get (callback){
  	open('GET', '/decode', false, callback);
  }

  function open (method, resource, data, callback){
    var xhr = new XMLHttpRequest();
		data = (data) ? data : null;
		xhr.open( method, APIEndpoint + resource );
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
