import React, {FC, useCallback, useState} from 'react';
import Input from '../../../UIKit/Elemets/Input/Input';
import Toggle from '../../../UIKit/Elemets/Toggle/Toggle';

import '../Auth.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';

import {TUserContainerProps} from '../../../Containers/Auth/AuthContainer';

interface Props {
	loginUserClient: (username: string, password: string) => Promise<string>;
}

const Login: FC<TUserContainerProps> = ({loginUserClient}: Props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [savePassword, setSavePassword] = useState(false);
	const [error, setError] = useState('');

	const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			setEmail(event.target.value);
		},
		[setEmail],
	);

	const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			setPassword(event.target.value);
		},
		[setPassword],
	);

	const onChangeSavePassword = useCallback(() => {
		setSavePassword((savePassword) => !savePassword);
	}, [setSavePassword, savePassword]);

	const loginHandler = useCallback(async () => {
		setError('');
		const res = await loginUserClient(email, password);
		if (res) {
			setError(res);
		}
	}, [loginUserClient, email, password, savePassword]);

	return (
		<div className="login-form">
			<div className="login-form-label CustomFontLite">
				Пожалуйста, используйте свои учетные данные DIKTIX для входа.
			</div>
			<div className="login-form-inputs">
				<Input type="text" placeholder="Login" onChange={onChangeEmail} value={email} />
				<Input
					type="password"
					placeholder="Password"
					onChange={onChangePassword}
					value={password}
				/>
			</div>
			<div className="login-form-error">{error}</div>
			<div className="login-form-settings">
				<div className="login-form-settings-toggle">
					<Toggle status={savePassword} onClick={onChangeSavePassword} />
					<div className="login-form-settings-toggle-label CustomFontBold">Запомнить меня</div>
				</div>
				<div className="login-form-settings-button CustomFontBold" onClick={loginHandler}>
					Войти
				</div>
			</div>
		</div>
	);
};

export default Login;
