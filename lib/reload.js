const log = require('./log.js');

module.exports = {
	install: () => {
		setTimeout(() => {
			log.clear();
			location.reload(false);
		}, 20000);
	}
}
