import React from 'react';
import MaterialIcon from './material-icon.jsx';

export default function Modal(props) {
	const header = (
		<div className="modal-header">
			<button
				className="modal-close"
				onClick={props.onClose || null}
			>
				<MaterialIcon name="close" />
			</button>
		</div>
	);

	const modalDialog = (
		<div className="modal">
			<div
				className="modal-backdrop"
				onClick={props.onClose}
			/>
			<div className="modal-dialog">
				{props.close ? header : null}
				<div className="modal-content">
					{props.children}
				</div>
			</div>
		</div>
	);

	return props.show ? modalDialog : null;
}

Modal.propTypes = {
	close: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	show: React.PropTypes.bool
};

Modal.defaultProps = {
	close: false,
	show: false
};
