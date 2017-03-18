const textarea = document.getElementById('textarea');
alert('Welcome to CHIRIMEN!');
console.log('Welcome to CHIRIMEN');
textarea.value = 'CHIRIMEN';
window.addEventListener('load', () => {
	try {
			textarea.value = 'CHIRIMEN2';
			navigator.requestGPIOAccess().then((gpio) => {
				const ports = gpio.ports;

				textarea.value = JSON.stringify(ports, '  ', 2);
			});
	} catch (error) {
		console.error(error);
		textarea.value = `ERROR: ${error}`;
	}
});
