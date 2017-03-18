const port244 = require('./port244.js')
const port193 = require('./port193.js')
const port199 = require('./button_port.js')
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
		button_port(gpio);
	});

    navigator.requestI2CAccess().then(function(i2cAccess){
	i2c_port = i2cAccess.ports.get(0);
    });
	
					  
});
