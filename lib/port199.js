const log = require('./log.js');

module.exports = (gpio) => {
	const buttonPort = gpio.ports.get(199);
	buttonPort.export('in').then(() => {
		buttonPort.onchange = function(state2) {
			log(state2 ? 'a' : 'b');
			document.body.style.backgroundColor = state2 ? 'blue' : 'white';
			state2 != state2;
		}
	});
};
