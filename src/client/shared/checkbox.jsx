import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {checked: props.checked};
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
	}

	toggleCheckbox() {
		const nextState = !this.state.checked;
		this.setState({checked: nextState});
		this.props.onChange(nextState);
	}

	render() {
		return (
			<label>
				<input
					type="checkbox"
					value={this.props.label}
					checked={this.state.checked}
					onChange={this.toggleCheckbox}
				/>
				{this.props.label}
			</label>
		);
	}
}

Checkbox.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	checked: PropTypes.bool
};

Checkbox.defaultProps = {
	checked: false
};
