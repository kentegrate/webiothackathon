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
			<svg styleName="root" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<image x="0" y="0" width="100%" height="100%" xlinkHref="img/park_editable.svg" />
				<Snake x={0} y={0} />
				<Animal x={40} y={20} name="オカピ" />
				<Animal x={30} y={60} name="ハシビロコウ" />
				<Animal x={60} y={60} name="メガネザル" />
				<Animal x={70} y={50} name="キリン" />
				<Animal x={90} y={80} name="シマウマ" />
				<Animal x={10} y={30} name="ヘビ" />
			</svg>
		);
	}
}

module.exports = CSSModules(App, styles);
