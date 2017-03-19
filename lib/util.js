module.exports.translate = ({x, y}) => `translate(${x}, ${y})`;

module.exports.distance = ({x: x1, y: y1}, {x: x2, y: y2}) => (
	Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
);

module.exports.angle = ({x: x1, y: y1}, {x: x2, y: y2}) => (
	Math.atan2(y2 - y1, x2 - x1)
);
