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
		console.log('gpio:', gpio);
		
		const port = gpio.ports.get(244);
		port.export('out').then(() => {
			console.log('port:', port);
			port.write(1);
			document.body.style.backgroundColor = 'red';
			setInterval(() => {
				state = !state;
				port.write(state ? 1 : 0);
				log(state ? 'on' : 'off');
				//document.body.style.backgroundColor = state ? 'red' : 'white';
			}, 1000);
		});
		
		const port2 = gpio.ports.get(193);
		port2.export('in').then(() => {
			console.log('port:', port2);
			log(port2.read());
		});
	});
});
