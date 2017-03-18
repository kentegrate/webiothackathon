module.exports = (text) => {
	console.log(text);
	textarea.value += `${text}\n`;
	textarea.scrollTop = textarea.scrollHeight;
};
