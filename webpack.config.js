const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './lib/index.js',
	output: {
		path: __dirname,
		filename: 'build/index.js',
	},
	module: {
		loaders: [{
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react'],
			},
		}],
	},
};
