const log = require('./log.js');

module.exports = (gpio) => {
	let state = false;
	const port = gpio.ports.get(244);
	port.export('out').then(() => {
		console.log('port:', port);
		port.write(1);
		document.body.style.backgroundColor = 'red';
		setInterval(() => {
			state = !state;
			port.write(state ? 1 : 0);
			log(state ? 'on' : 'off');
			document.body.style.backgroundColor = state ? 'red' : 'white';
		}, 1000);
	});
};
