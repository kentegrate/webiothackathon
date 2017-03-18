const React = require('react');
const CSSModules = require('react-css-modules');

const Snake = require('./Snake.jsx');
const Animal = require('./Animal.jsx');
const styles = require('./App.css');

class App extends React.Component {
	constructor(props, state) {
		super(props, state);
		this.state = {
			animals: [{
				x: 100,
				y: 35,
				name: 'キリン',
			}, {
				x: 45,
				y: 68,
				name: 'ヘビ',
			}, {
				x: 140,
				y: 23,
				name: 'カバ',
			}, {
				x: 150,
				y: 50,
				name: 'シマウマ',
			}, {
				x: 120,
				y: 70,
				name: 'カンガルー',
			}, {
				x: 97,
				y: 82,
				name: 'ペンギン',
			}],
		};
	}

	render() {
		return (
			<svg styleName="root" viewBox="0 0 200 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<image x="0" y="0" width="100%" height="100%" xlinkHref="img/park_editable.svg" />
				<Snake x={0} y={0} />
				{this.state.animals.map((animal) => (
					<Animal key={animal.name} x={animal.x} y={animal.y} name={animal.name} />
				))}
			</svg>
		);
	}
}

module.exports = CSSModules(App, styles);
