import React from 'react';

export default function MaterialIcon(props) {
	return (
		<i className="material-icons">{props.name}</i>
	);
}

MaterialIcon.propTypes = {
	name: React.PropTypes.string.isRequired
};
