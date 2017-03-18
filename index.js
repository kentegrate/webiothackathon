const textarea = document.getElementById('textarea');
let state = false;

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log(gpio);
		const ports = gpio.ports;

		textarea.value = JSON.stringify(ports, '  ', 2);

		const port = gpio.ports.get(198);
		return port.export('out');
	}).then(() => {
		console.log('port exported');
		document.body.style.backgroundColor = 'red';
		setInterval(() => {
			state = !state;
			console.log(state ? 'on' : 'off');
			port.write(state ? 1 : 0);
			document.body.style.backgroundColor = state ? 'red' : 'white';
		}, 1000);
	});
});
