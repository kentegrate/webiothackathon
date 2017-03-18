const port244 = require('./port244.js')
const port193 = require('./port193.js')
const port199 = require('./port199.js')

const textarea = document.getElementById('textarea');

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio taken:', gpio);

		port244(gpio);
		port193(gpio);
		port199(gpio);
	});
});
