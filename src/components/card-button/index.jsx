import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

export default function CardButton(props) {
	const {
		card,
		className,
		label,
		onClick,
		...passthroughProps
	} = props;

	return (
		<button
			className={classnames('card-button', className || '')}
			{...passthroughProps}
		>
			<img
				src={_.get(card, 'url', '../static/img/card-back.jpg')}
				alt={_.get(card, 'name', 'No card to display')}
				onClick={onClick}
			/>
			{ label ? (
				<div className="card-button-label">
					<div className="center-vertical">
						{label}
					</div>
				</div>
			) : null }
		</button>
	);
}

CardButton.propTypes = {
	card: PropTypes.shape({
		name: PropTypes.string,
		url: PropTypes.string
	}),
	className: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired
};
