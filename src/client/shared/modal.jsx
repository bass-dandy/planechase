import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from './material-icon.jsx';

export default class Modal extends React.Component {

	getChildContext() {
		return {onHide: this.props.onHide};
	}

	render() {
		const modalDialog = (
			<div className="modal">
				<div
					className="modal-backdrop"
					onClick={this.props.onHide}
				/>
				<div className="modal-dialog">
					{this.props.children}
				</div>
			</div>
		);

		return this.props.show ? modalDialog : null;
	}
}

Modal.propTypes = {
	children: PropTypes.object,
	onHide: PropTypes.func,
	show: PropTypes.bool
};

Modal.defaultProps = {
	show: false
};

Modal.childContextTypes = {
	onHide: PropTypes.func
};

Modal.Header = function ModalHeader(props, context) {
	const closeButton = (
		<button
			className="modal-close"
			onClick={context.onHide || null}
		>
			<MaterialIcon name="close" />
		</button>
	);

	return (
		<div className="modal-header">
			{props.children}
			{props.closeButton ? closeButton : null}
		</div>
	);
};

Modal.Header.propTypes = {
	children: PropTypes.object,
	closeButton: PropTypes.bool
};

Modal.Header.defaultProps = {
	closeButton: false
};

Modal.Header.contextTypes = {
	onHide: PropTypes.func
};

Modal.Body = function ModalBody(props) {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
};

Modal.Body.propTypes = {
	children: PropTypes.object
};

Modal.Footer = function ModalFooter(props) {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	);
};

Modal.Footer.propTypes = {
	children: PropTypes.object
};
