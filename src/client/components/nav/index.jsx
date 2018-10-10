import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ResizeObserver from 'resize-observer-polyfill';

import ChaosIcon from '../chaos-icon';

export default class Nav extends React.Component {

	static propTypes = {
		onResize: PropTypes.func
	}

	componentDidMount() {
		if (_.isFunction(this.props.onResize)) {
			this.resizeObserver = new ResizeObserver((elements) => {
				const height = _.get(elements, '[0].contentRect.height', 0);
				this.props.onResize(height);
			});
			this.resizeObserver.observe(this.navContainer);
		}
	}	

	render() {
		return (
			<div
				className="nav"
				ref={(e) => { this.navContainer = e; }}
			>
				<div className="nav-title">
					<div className="nav-title-icon">
						<ChaosIcon/>
					</div>
					<h1 className="nav-title-text">
						Planechase
					</h1>
				</div>
				<div className="nav-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
