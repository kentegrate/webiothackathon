const log = require('./log.js');

module.exports = (gpio) => {
	const port2 = gpio.ports.get(193);
	port2.export('in').then(() => {
		console.log('port:', port2);
		port2.read().then((value) => {
			log(value);
		});
	});
};
