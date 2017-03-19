const button_port = require('./button_port.js');
const log = require('./log.js');

var reloader = {
	reload: () => {
		log.clear();
		location.reload(false);
	},
	install: (gpio) => {
		button_port(gpio).setHandler((() => {
			var k = () => {
				log('next button will reload');
				k = () => { reloader.reload(); }
			};
			return k;
		})());
	}
}

module.exports = reloader;
