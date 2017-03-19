const React = require('react');

const {translate} = require('./util.js');
const adc121 = require('./ADC121.js')

const startPoint = [-10, 10];
const startAngle = Math.PI / 180 * 90;
const unitLength = 3;
const lines = [5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];

class Snake extends React.Component {
	constructor(props, state) {
		super(props, state);

		this.state = {
			angle: Math.PI / 2,
		};

		navigator.requestI2CAccess().then((i2cAccess) => {
			const i2cPort = i2cAccess.ports.get(0);
			return adc121(i2cPort);
		}).then((sensor) => {
			setInterval(() => {
				const voltage = sensor.read();
				this.setState({angle: (160 - voltage) / 2 + 10});
			}, 100);
		});
	}

	getSnakePath() {
		const angle = this.state.angle;

		const points = [startPoint];

		lines.forEach((line, index) => {
			const lineLength = line * unitLength;
			const lastPoint = points[points.length - 1];
			points.push([
				lastPoint[0] + lineLength * Math.sin(angle * index + startAngle),
				lastPoint[1] + lineLength * Math.cos(angle * index + startAngle),
			]);
		});

		const midPoints = [];

		points.reduce((previous, current) => {
			midPoints.push([
				(previous[0] + current[0]) / 2,
				(previous[1] + current[1]) / 2,
			]);
			return current;
		});

		return `M ${points[0].join(' ')} L ${midPoints[0].join(' ')} ${midPoints.slice(1).map((point, index) => `Q ${points[index + 1].join(' ')} ${point.join(' ')}`).join(' ')}`;
	}

	render() {
		return (
			<g transform={translate(this.props)}>
				<path d={this.getSnakePath()} strokeWidth="2px" stroke="green" fill="none" />
			</g>
		);
	}
}

module.exports = Snake;
