const React = require('react');
const CSSModules = require('react-css-modules');

const Snake = require('./Snake.jsx');
const Animal = require('./Animal.jsx');
const styles = require('./App.css');

class App extends React.Component {
	constructor(props, state) {
		super(props, state);
	}

	render() {
		return (
			<svg styleName="root" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<Snake x={0} y={0} />
				<Animal x={60} y={60} name="オカピ" />
				<Animal x={60} y={60} name="オカピ" />
				<Animal x={70} y={50} name="キリン" />
				<Animal x={90} y={80} name="シマウマ" />
				<Animal x={10} y={30} name="ヘビ" />
			</svg>
		);
	}
}

module.exports = CSSModules(App, styles);
