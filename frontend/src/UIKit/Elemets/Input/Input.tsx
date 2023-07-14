import React from 'react';
import {HandySvg} from 'handy-svg';

import iconSrc from '../../../Assets/Icons/IconNext.svg';

import './Input.scss';
import '../../Theme/Styles/_fonts_global.scss';

type Props = {
	value: string;
	type: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: Props) => {
	const {value, onChange, type, placeholder} = props;

	return (
		<input
			type={type}
			value={value}
			className="Input CustomFontRegular"
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default Input;
