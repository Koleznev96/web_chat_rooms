import React, {useCallback, useState} from 'react';
import {HandySvg} from 'handy-svg';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import FontAuth from '../../Components/Auth/FontAuth/FontAuth';
import Login from '../../Components/Auth/Login/Login';
import Register from '../../Components/Auth/Register/Register';
import ButtonNext from '../../UIKit/Elemets/ButtonNext/ButtonNext';
import iconSrc from '../../Assets/Icons/Logo.svg';

import './AuthContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {User} from '../../Lib/Redux/User/slice';

import {userClientOnlyActions} from '../../Lib/Redux/User/Actions/userClientOnlyActions';
import {selectUserState} from '../../Lib/Redux/User/Selectors/selectUserState';
import useAuthSection from './useAuthSection';

const AuthContainer = (props: TUserContainerProps) => {
	const {user, loginUser} = props;
	const [isAuth, setIsAuth] = useState(true);

	const {loginUserClient} = useAuthSection({
		user,
		login: loginUser,
	});

	const toggleAuthHandler = useCallback(() => {
		setIsAuth((isAuth) => !isAuth);
	}, [setIsAuth, isAuth]);

	return (
		<div className="auth">
			<div className="auth-container">
				<div className="auth-container-languages"></div>
				<div className="form">
					<div className="auth-container-logo CustomFontMedium ">
						<HandySvg src={iconSrc} className="LogoIcon" width="45" height="45" />
						DIKTIX-Markup-Data
					</div>
					{isAuth ? <Login loginUserClient={loginUserClient} /> : <Register />}
				</div>
				<div className="auth-container-footer">
					<ButtonNext title={isAuth ? 'Register' : 'Login'} onClick={toggleAuthHandler} />
				</div>
			</div>

			<FontAuth />
		</div>
	);
};

// export default AuthContainer;

const mapDispatchToProps = (dispatch: Dispatch) => ({
	loginUser: (updates: Partial<User>) => dispatch(userClientOnlyActions.login({...updates})),
});

type TContentUpsellContainerStateProps = ReturnType<typeof selectUserState>;

export default connect(selectUserState, mapDispatchToProps)(AuthContainer);

export type TUserContainerProps = TUserContainerConnectedDispatches &
	TContentUpsellContainerStateProps;

type TUserContainerConnectedDispatches = ReturnType<typeof mapDispatchToProps>;
