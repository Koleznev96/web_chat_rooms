import React, {useCallback, useState} from 'react';
import Input from '../../../UIKit/Elemets/Input/Input';
import Toggle from '../../../UIKit/Elemets/Toggle/Toggle';

import '../Auth.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';

const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [savePassword, setSavePassword] = useState(false);

	const onChangeLogin: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			setLogin(event.target.value);
		},
		[setLogin],
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

	return (
		<div className="login-form">
			<div className="login-form-label CustomFontLite">Придумайте логин и пароль для учетной записи DIKTIX.</div>
			<div className="login-form-inputs">
				<Input type="text" placeholder="Login" onChange={onChangeLogin} value={login} />
				<Input type="password" placeholder="Password" onChange={onChangePassword} value={password} />
			</div>
			<div className="login-form-settings">
				<div className="login-form-settings-toggle">
					<Toggle status={savePassword} onClick={onChangeSavePassword} />
					<div className="login-form-settings-toggle-label CustomFontBold">
						Я согласен с положениями и условиями и политикой конфиденциальности Diktix.
					</div>
				</div>
			</div>
			<div className="login-form-settings-footer">
				<div className="login-form-settings-button CustomFontBold">Зарегестрироваться</div>
			</div>
		</div>
	);
};

export default Register;
