const textarea = document.getElementById('textarea');

var log = (text) => {
	console.log(text);
	if (textarea) {
		textarea.value += `${text}\n`;
		textarea.scrollTop = textarea.scrollHeight;
	}
};

log.clear = () => { textarea.value = ''; };
log.log = log;

module.exports = log;
