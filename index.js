const textarea = document.getElementById('textarea');
let state = false;

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio:', gpio);
		const ports = gpio.ports;

		textarea.value = JSON.stringify(ports, '  ', 2);

		const port = gpio.ports.get(198);
		return port.export('out').then(() => port);
	}).then((port) => {
		console.log('port:', port);
		port.write(1);
		console.log('wrote port');
		document.body.style.backgroundColor = 'red';
		console.log('red');
		setInterval(() => {
			console.log(state);
			state = !state;
			console.log(state);
			port.write(state ? 1 : 0);
			console.log('port wrote');
			document.body.style.backgroundColor = state ? 'red' : 'white';
		}, 1000);
	});
});
