import React from 'react';
import {HandySvg} from 'handy-svg';

import iconSrc from '../../../Assets/Icons/IconNext.svg';

import './ButtonNext.scss';
import '../../Theme/Styles/_fonts_global.scss';

type Props = {
	title: string;
	onClick: () => void;
};

const ButtonNext = (props: Props) => {
	const {title, onClick} = props;

	return (
		<div className="ButtonNext CustomFontBold" onClick={onClick}>
			{title}
			<HandySvg src={iconSrc} className="NextIcon" width="30" height="30" />
		</div>
	);
};

export default ButtonNext;
