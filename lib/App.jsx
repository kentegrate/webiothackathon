const React = require('react');
const CSSModules = require('react-css-modules');

const Snake = require('./Snake.jsx');
const Animal = require('./Animal.jsx');
const styles = require('./App.css');
const {translate, rotate, distance, angle} = require('./util.js');
const pca9685 = require('./PCA9685.js')
//const mpr121 = require('./MPR121.js')

const currentPlace = {x: 137, y: 37};

class App extends React.Component {
	constructor(props, state) {
		super(props, state);

		this.state = {
			animals: [{
				x: 100,
				y: 35,
				name: 'キリン',
				img: './img/animalface_kirin.png',
			}, {
				x: 45,
				y: 68,
				name: 'ヘビ',
				img: './img/hebi_blue.png',
			}, {
				x: 150,
				y: 50,
				name: 'シマウマ',
				img: './img/animal_shimauma.png',
			}, {
				x: 97,
				y: 82,
				name: 'ペンギン',
				img: './img/penguin03_gentoo.png',
			}],
			activeAnimal: null,
			pointerAngle: 0,
		};

        this.myAudio = new Audio("./sound/select_sound.ogg");

		this.pca9685 = navigator.requestI2CAccess().then((i2cAccess) => {
			const i2cPort = i2cAccess.ports.get(0);
			return pca9685(i2cPort);
		}).then((servo) => {
			this.servo = servo;
		});
/*
		this.mpr121 = navigator.requestI2CAccess().then((i2cAccess) => {
			console.log('(app) i2cAccess:', i2cAccess);
			const i2cPort = i2cAccess.ports.get(0);
			console.log('(app) i2cPort:', i2cPort);
			return mpr121(i2cPort);
		}).then((touchSensor) => {
			touchSensor.addEventListener('stateChange', (pin, state) => {
				console.log('(app) pin:', pin);
				console.log('(app) state:', state);
				if(state) {
					this.onClickAnimal(this.state.animals[pin].name);
				}
			});
		});
        */

		navigator.requestGPIOAccess().then((gpio) => {
			button_port(gpio).setHandler((state) => {
				if (state) {
					this.onClickAnimal(this.state.animals[2].name);
				}
			});
		});
	}

	onClickAnimal(name) {
		this.setState({activeAnimal: name});
		const activeAnimal = this.state.animals.find((animal) => animal.name === name);

        Promise.new(() => {
		    if(this.myAudio) {
                this.myAudio.load();
                this.myAudio.play();
            }
        }).then(() => {
            if (this.servo) {
                const pointerAngle = angle(currentPlace, activeAnimal) / Math.PI * 180 + 90;
                const servoAngle = 180 - (pointerAngle + 90 + 360 - 45) % 180;
                this.setState({pointerAngle});
                this.servo.setServo(0, servoAngle)
            }
        });
    }

	onSnakeRoll() {
		this.onClickAnimal('ヘビ');
	}

	render() {
		return (
			<svg styleName="root" viewBox="0 0 200 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
				<image x="0" y="0" width="100%" height="100%" xlinkHref="img/park_editable.svg" />
				<text x="10" y="15" fontSize="8" textAnchor="left">上野動物園 西園 案内図</text>
				<Snake x={33} y={51} onRoll={this.onSnakeRoll.bind(this)} />
				{this.state.animals.map((animal) => (
					<Animal key={animal.name} x={animal.x} y={animal.y} name={animal.name} img={animal.img} active={this.state.activeAnimal === animal.name} onClick={this.onClickAnimal.bind(this)} />
				))}
				<g transform={translate({x: 137, y: 37})}>
					<polygon styleName="pointer" points="0, -5 1, -3 -1, -3" fill="red" style={{transform: rotate(this.state.pointerAngle)}}/>
					<circle cx="0" cy="0" r="2" fill="red" />
					<text x="0" y="7" fontSize="5" textAnchor="middle">現在地</text>
				</g>
			</svg>
		);
	}
}

module.exports = CSSModules(App, styles);
