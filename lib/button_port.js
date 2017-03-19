const log = require('./log.js');

var ButtonPort = function (gpio) {
	var self = this;
	self.gpio = gpio;
	self.callback = (() => {
		var myAudio = new Audio("http://a-babe.plala.jp/~ni-on/music/ogg/jingle/gentle-d.ogg");
		var h = (state) => {
			log('state=' + state);
			myAudio.load();
			myAudio.play();
		}
		document.getElementById('play_sound').addEventListener("click", () => {
			self.callback();
		});
		return h;
	})();
	self.buttonPort = gpio.ports.get(199);
	self.buttonPort.export('in').then(() => {
		self.buttonPort.onchange = (state) => {
			log('button pushed, state=' + state);
			self.callback(state);
		};
	});
};

ButtonPort.prototype.setHandler = function (callback) {
	this.callback = callback;
};

module.exports = (gpio) => {
	return new ButtonPort(gpio);
}
