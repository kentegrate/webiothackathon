const log = require('./log.js');

var ButtonPort = function (gpio) {
	var self = this;
	self.gpio = gpio;
	self.callback = (() => {});
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

var singleton;
module.exports = (gpio) => {
	if (!singleton) {
		singleton = new ButtonPort(gpio);
	}
	return singleton;
}
