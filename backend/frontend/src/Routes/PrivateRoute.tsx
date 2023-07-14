import React, {FC, lazy, ReactNode} from 'react';

import {useStoreSelector} from '../Lib/Hooks/useStoreSelector';
import {selectIsLoggedIn} from '../Lib/Redux/User/Selectors/selectIsLoggedIn';

const Login = lazy(() => import('./VirtualPage/Introduction'));

const PrivateRoute: FC<{component: ReactNode; noAuthComponent?: ReactNode}> = ({
	component,
	noAuthComponent = <Login />,
}) => {
	const isLoggedIn = useStoreSelector(selectIsLoggedIn);

	// if (!isLoggedIn) {
	// 	return <>{noAuthComponent}</>;
	// }

	return <>{component}</>;
};

export default PrivateRoute;
