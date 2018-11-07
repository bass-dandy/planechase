import React from 'react';
import PropTypes from 'prop-types';

export default function Pan(props) {
	return (
		<div
			className="eternities-map-pan"
			style={{
				transform: `translate(${props.pan.x}px, ${props.pan.y}px)`
			}}
		>
			{props.children}
		</div>
	);
}

Pan.propTypes = {
	pan: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	children: PropTypes.node
};

Pan.defaultProps = {
	pan: {
		x: 0,
		y: 0
	}
};
