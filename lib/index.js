const port244 = require('./port244.js')
const port193 = require('./port193.js')
const port199 = require('./port199.js')
const pca9685 = require('./PCA9685.js')
const App = require('./App.jsx');

const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(React.createElement(App), document.getElementById('app'));

const textarea = document.getElementById('textarea');

window.addEventListener('load', () =>	 {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio taken:', gpio);

		port244(gpio);
		port193(gpio);
		port199(gpio);
	});

    navigator.requestI2CAccess().then(function(i2cAccess){
	const i2cPort = i2cAccess.ports.get(0);
	pca9685(i2cPort);
	
    });
	
					  
});
