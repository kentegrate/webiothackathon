const React = require('react');
const CSSModules = require('react-css-modules');

const Snake = require('./Snake.jsx');
const Animal = require('./Animal.jsx');
const styles = require('./App.css');
const {translate, distance, angle} = require('./util.js');
const pca9685 = require('./PCA9685.js')

const currentPlace = {x: 137, y: 37};

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
				x: 150,
				y: 50,
				name: 'シマウマ',
			}, {
				x: 97,
				y: 82,
				name: 'ペンギン',
			}],
			activeAnimal: null,
		};

		this.pca9685 = navigator.requestI2CAccess().then((i2cAccess) => {
			const i2cPort = i2cAccess.ports.get(0);
			return pca9685(i2cPort);
		}).then((servo) => {
			this.servo = servo;
		});
	}

	onClickAnimal(name) {
		this.setState({activeAnimal: name});
		const activeAnimal = this.state.animals.find((animal) => animal.name === name);

		if (this.servo) {
			const servoAngle = (angle(currentPlace, activeAnimal) / Math.PI * 180 + 180 + 360 - 45) % 180;
			this.servo.setServo(0, servoAngle)
		}
	}

	render() {
		return (
			<svg styleName="root" viewBox="0 0 200 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<image x="0" y="0" width="100%" height="100%" xlinkHref="img/park_editable.svg" />
				<text x="100" y="15" fontSize="10" textAnchor="middle">上野動物園 西園 案内図</text>
				<g transform={translate({x: 137, y: 37})}>
					<circle cx="0" cy="0" r="2" fill="red" />
					<text x="0" y="7" fontSize="5" textAnchor="middle">現在地</text>
				</g>
				<Snake x={33} y={51} />
				{this.state.animals.map((animal) => (
					<Animal key={animal.name} x={animal.x} y={animal.y} name={animal.name} active={this.state.activeAnimal === animal.name} onClick={this.onClickAnimal.bind(this)} />
				))}
			</svg>
		);
	}
}

module.exports = CSSModules(App, styles);
