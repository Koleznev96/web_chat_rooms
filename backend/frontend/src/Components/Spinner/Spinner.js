// global window
import React from 'react';

import './Spinner.scss';

export default class Spinner extends React.Component {
	render() {
		return (
			<div className="spinner">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115">
					<path
						fill="none"
						stroke="rgba(0, 0, 0, 0.08)"
						strokeWidth="5"
						d="M 85 85 C -5 16 -39 127 78 30 C 126 -9 57 -16 85 85 C 94 123 124 111 85 85 Z"
					/>
					<path
						id="el"
						fill="none"
						strokeDasharray="60 310"
						strokeLinecap="round"
						strokeWidth="5"
						d="M 85 85 C -5 16 -39 127 78 30 C 126 -9 57 -16 85 85 C 94 123 124 111 85 85 Z"
					/>
				</svg>
			</div>
		);
	}
}
