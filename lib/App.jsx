const React = require('react');

const startPoint = [5, 35];
const startAngle = Math.PI / 180 * 90;
const unitLength = 10;
const lines = [3, 3, 3, 2, 2, 1, 1];

class App extends React.Component {
	constructor(props, state) {
		super(props, state);
		this.state = {
			snakeAngle: Math.PI / 180 * 90,
		};
	}

	getSnakePath() {
		const angle = this.state.snakeAngle;

		const points = [startPoint];

		lines.forEach((line, index) => {
			const lineLength = line * unitLength;
			const lastPoint = points[points.length - 1];
			points.push([
				lastPoint[0] + lineLength * Math.sin(angle * index + startAngle),
				lastPoint[1] + lineLength * Math.cos(angle * index + startAngle),
			]);
		});

		return `M ${points.map((point) => point.join(' ')).join(' L ')}`;
	}

	render() {
		return (
			<svg viewBox="0 0 100 100" width="300px" height="300px" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d={this.getSnakePath()} strokeWidth="6px" stroke="green" fill="none" />
			</svg>
		);
	}
}

module.exports = App;
