import React from 'react';

import FonAuthImg from '../../../Assets/Images/FonAuth.png';

import './FontAuth.scss';

class FontAuth extends React.Component {
	render() {
		return (
			<div className="font-auth">
				<div className="font-auth-el" />
				<img className="font-auth-img" src={FonAuthImg} alt="Google" />
			</div>
		);
	}
}

export default FontAuth;
