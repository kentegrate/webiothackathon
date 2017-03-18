const port244 = require('./port244.js')
const port193 = require('./port193.js')
const port199 = require('./port199.js')

const textarea = document.getElementById('textarea');
let state = false;

const log = (text) => {
	console.log(text);
	textarea.value += `${text}\n`;
	//textarea.value += "エイッ!!\n　　　　∧,,∧\n☆二　⊂(・ω・｀)\n　　　　-ヽ　　と)\n　　　　｀ｕ-ｕ'";
	//textarea.scrollTop = textarea.scrollHeight;
};

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio taken:', gpio);

		port244(gpio);
		port193(gpio);
		port199(gpio);
	});
});
