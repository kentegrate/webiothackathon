const log = require('./log.js');

var reloader = {
	reload: () => {
		log.clear();
		location.reload(false);
	},
	install: () => {
		setTimeout(reloader.reload, 60000);
	}
}

module.exports = reloader;
