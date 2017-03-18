const React = require('react');
const Snake = require('./Snake.jsx');

class App extends React.Component {
	constructor(props, state) {
		super(props, state);
	}

	render() {
		return (
			<svg viewBox="0 0 100 100" width="300px" height="300px" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<Snake x={0} y={0} />
			</svg>
		);
	}
}

module.exports = App;
