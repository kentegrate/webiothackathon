const port244 = require('./port244.js')
const port193 = require('./port193.js')
const pca9685 = require('./PCA9685.js')
const mpr121 = require('./MPR121.js') // will be renamed to touch_sensor
const button_port = require('./button_port.js')
const adc121 = require('./ADC121.js')

const React = require('react');
const ReactDOM = require('react-dom');

const reload_lib = require('./reload.js');

const textarea = document.getElementById('textarea');

window.addEventListener('load', () =>	 {
	navigator.requestGPIOAccess().then((gpio) => {
		console.log('gpio taken:', gpio);

		port244(gpio);
		port193(gpio);
		button_port(gpio);
	});

	navigator.requestI2CAccess().then((i2cAccess) => {
		const i2cPort = i2cAccess.ports.get(0);
		pca9685(i2cPort);
	    adc121(i2cPort).then(function(adcInstance){
//		setInterval(function(){
//		    var voltage = adcInstance.read();
//		    console.log("voltage: ", voltage);
//		}, 1000);
	    });
	});

    navigator.requestI2CAccess().then((i2cAccess) => {
      const i2cPort = i2cAccess.ports.get(0);
      mpr121(i2cPort);
    });

	reload_lib.install();
});
