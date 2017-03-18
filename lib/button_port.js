const log = require('./log.js');

module.exports = (gpio) => {
	const buttonPort = gpio.ports.get(199);
	var myAudio = new Audio("http://a-babe.plala.jp/~ni-on/music/ogg/jingle/gentle-d.ogg");
	buttonPort.export('in').then(() => {
		buttonPort.onchange = function(state) {
			log('button pushed, play sound');
			document.body.style.backgroundColor = state ? 'blue' : 'yellow';
			state != state;
			myAudio.stop();
			myAudio.play();
		}
		var pwmButton = document.getElementById("play_sound");
    pwmButton.addEventListener("click", function(){
			myAudio.stop();
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
