const textarea = document.getElementById('textarea');
let state = false;

const log = (text) => {
	console.log(text);
	textarea.value += `${text}\n`;
	textarea.value = 
"エイッ!! \
　　　　∧,,∧\
☆二　⊂(・ω・｀)\
　　　　-ヽ　　と)\
　　　　　｀ｕ-ｕ'"
};

window.addEventListener('load', () => {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio:', gpio);
		const port = gpio.ports.get(244);
		return port.export('out').then(() => port);
	}).then((port) => {
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
});
