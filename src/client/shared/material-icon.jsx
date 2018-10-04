import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialIcon(props) {
	return (
		<i className="material-icons">{props.name}</i>
	);
}

MaterialIcon.propTypes = {
	name: PropTypes.string.isRequired
};
