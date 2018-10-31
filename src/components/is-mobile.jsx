import React from 'react';

const MOBILE_CUTOFF = 550;

export default function IsMobileHOC(Component) {
	return class IsMobile extends React.Component {

		state = {
			viewportWidth: document.documentElement.clientWidth
		}

		measureViewport = () => {
			this.setState({viewportWidth: document.documentElement.clientWidth});
		}

		componentDidMount() {
			window.addEventListener('resize', this.measureViewport);
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.measureViewport);
		}

		render() {
			return (
				<Component
					isMobile={this.state.viewportWidth <= MOBILE_CUTOFF}
					{...this.props}
				/>
			);
		}
	};
}
