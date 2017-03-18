const log = require('./log.js');

module.exports = (gpio) => {
	const bendingPort = gpio.ports.get(193);
	bendingPort.export('in').then(() => {
		bendingPort.onchange = function() {
			log('bending sensor');
		}
	});
};
