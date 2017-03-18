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
				x: 70,
				y: 50,
				name: 'キリン',
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
