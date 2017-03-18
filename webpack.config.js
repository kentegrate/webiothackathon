const path = require('path');
const webpack = require('webpack');

const JS = {
	test: /\.js$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: {
		presets: ['es2015'],
	},
};

const JSX = {
	test: /\.jsx$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: {
		presets: ['es2015', 'react'],
	},
};

const CSS = {
	test: /\.css$/,
	loaders: [
		'style-loader?sourceMap',
		'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
	],
	exclude: /node_modules/,
};

module.exports = [{
	entry: './lib/index.js',
	output: {
		path: __dirname,
		filename: 'build/index.js',
	},
	module: {
		loaders: [JS, JSX],
	},
}, {
	entry: './lib/guide.js',
	output: {
		path: __dirname,
		filename: 'build/guide.js',
	},
	module: {
		loaders: [JS, JSX, CSS],
	},
}];
