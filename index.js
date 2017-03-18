alert('Welcome to CHIRIMEN!');
console.log('Welcome to CHIRIMEN');
textarea.value = 'CHIRIMEN';
window.addEventListener('load', () => {
	textarea.value = 'CHIRIMEN2';
	navigator.requestGPIOAccess().then((gpio) => {
		const textarea = document.getElementById('textarea');
		const ports = gpio.ports;

		textarea.value = JSON.stringify(ports, '  ', 2);
	});
});
