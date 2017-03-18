const React = require('react');
const {translate} = require('./util.js');

const startPoint = [5, 55];
const startAngle = Math.PI / 180 * 90;
const unitLength = 8;
const lines = [5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1];

class Animal extends React.Component {
	constructor(props, state) {
		super(props, state);
	}

	render() {
		return (
			<g transform={translate(this.props)}>
				<circle cx="0" cy="0" r="10" fill="pink" stroke={this.props.active ? 'red' : 'none'} />
				<text x="0" y="0" fontSize="4px" textAnchor="middle" fontWeight="bold">{this.props.name}</text>
			</g>
		)
	}
}

module.exports = Animal;
