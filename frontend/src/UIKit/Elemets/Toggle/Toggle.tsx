import React from 'react';
import {HandySvg} from 'handy-svg';

import iconSrc from '../../../Assets/Icons/IconNext.svg';

import './Toggle.scss';
import '../../Theme/Styles/_fonts_global.scss';

type Props = {
	status: boolean;
	onClick: () => void;
};

const Toggle = (props: Props) => {
	const {status, onClick} = props;

	return (
		<div className="Toogle" onClick={onClick}>
			<div className={status ? 'ToogleTrue' : 'ToogleFalse'}></div>
		</div>
	);
};

export default Toggle;
