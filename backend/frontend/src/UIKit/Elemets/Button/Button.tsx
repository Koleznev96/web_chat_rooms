import React from 'react';
import {HandySvg} from 'handy-svg';

import iconSrc from '../../../Assets/Icons/IconNext.svg';

import './Button.scss';
import '../../Theme/Styles/_fonts_global.scss';

type Props = {
	title: string;
	onClick: () => void;
};

const Button = (props: Props) => {
	const {title, onClick} = props;

	return (
		<div className="Button CustomFontSemiBold" onClick={onClick}>
			{title}
		</div>
	);
};

export default Button;
