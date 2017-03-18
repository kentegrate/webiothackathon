window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		const textarea = document.getElementById('textarea');
		const ports = gpio.ports;

		textarea.value = JSON.stringify(ports, '  ', 2);
	});
});
