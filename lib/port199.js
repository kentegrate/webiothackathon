const log = require('./log.js');

module.exports = (gpio) => {
	const buttonPort = gpio.ports.get(199);
	/*buttonPort.export('in').then(() => {
		buttonPort.onchange = function(state2) {
			log('button state changed');
			document.body.style.backgroundColor = state2 ? 'blue' : 'yellow';
			state2 != state2;
		}
	});*/
	buttonPport.export("in").then(()=>{
        setInterval(()=>{
          buttonPort.read().then( (value)=>{
            console.log("gpio= "+value);
          });
        },1000);
      });
};
