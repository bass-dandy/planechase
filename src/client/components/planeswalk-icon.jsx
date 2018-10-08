import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function PlaneswalkIcon(props) {
	return (
		<SvgIcon
			viewBox="0 0 600 1000"
			fontSize={props.fontSize}
		>
			<g transform="translate(-307.32143,422.67596)">
				<g transform="matrix(3.7037037,0,0,-3.7037037,307.32143,688.43515)">
					<g transform="translate(0,148.8545)">
						<path
							d="m 0,0 0.469,5.923 -0.184,0 0.184,0.095 6.195,78.928 c 0,0 3.087,-54.589 12.294,-70.364 3.95,1.56 7.965,2.959 12.042,4.221 9.948,26.042 13.441,103.416 13.441,103.416 0,0 2.322,-70.49 11.078,-97.851 4.801,0.719 9.684,1.223 14.662,1.535 9.048,33.655 11.507,125.243 11.507,125.243 0,0 2.981,-91.809 11.895,-125.356 4.744,-0.342 9.409,-0.877 14.002,-1.588 8.647,27.254 12.109,98.055 12.109,98.055 0,0 2.803,-77.8 11.859,-103.625 3.969,-1.231 7.875,-2.619 11.706,-4.14 10.044,15.58 13.582,70.352 13.582,70.352 l 4.792,-78.884 0.203,-0.102 -0.19,0 L 162,0 C 162,0 81.688,-26.142 81.688,-148.854 81.688,-26.724 0,0 0,0"
						/>
					</g>
				</g>
			</g>
		</SvgIcon>
	);
}

PlaneswalkIcon.propTypes = {
	fontSize: PropTypes.string
};

PlaneswalkIcon.defaultProps = {
	fontSize: 'default'
};
