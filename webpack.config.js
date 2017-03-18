const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './lib/index.js',
	output: {
		path: __dirname,
		filename: 'build/index.js',
	},
	module: {
	},
};
