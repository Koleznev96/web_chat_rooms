import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {userClientOnlyActions} from '../../Lib/Redux/User/Actions/userClientOnlyActions';

const PageNotFound = () => {
	const dispatch = useDispatch();

	const onLogout = useCallback(() => dispatch(userClientOnlyActions.logout()), [dispatch]);

	return (
		<div>
			<h1>Page Not Found</h1>
			<div onClick={onLogout}>Logout!!</div>
		</div>
	);
};

export default PageNotFound;
