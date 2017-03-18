const log = require('./log.js');

module.exports = (gpio) => {
	const buttonPort = gpio.ports.get(199);
	buttonPort.export('in').then(() => {
		buttonPort.onchange = function(state2) {
			log('button pushed, play sound');
			document.body.style.backgroundColor = state2 ? 'blue' : 'yellow';
			state2 != state2;
			var myAudio = new Audio("hhttp://a-babe.plala.jp/~ni-on/music/ogg/jingle/gentle-d.ogg");
			myAudio.play();
		}
		var pwmButton = document.getElementById("play_sound");
    pwmButton.addEventListener("click", function(){
			var myAudio = new Audio("http://a-babe.plala.jp/~ni-on/music/ogg/jingle/gentle-d.ogg");
			myAudio.play();
	  });
	});
};

	/*read()関数を使うversion 動かない
	buttonPport.export("in").then(()=>{
		setInterval(()=>{
    	buttonPort.read().then( (value)=>{
      	log("gpio= "+value);
    	});
  	},1000);
	});
};*/
