import {generatePath, NavigateProps, useLocation, Params, Search} from 'react-router';
import {useMemo} from 'react';

import EnumRoutes, {modalRoutes} from '../../Routes/EnumRoutes';
import {TNavigationState} from './useCloseModal';

const useNavigateProps = (route: EnumRoutes, params?: Params, search?: Search) => {
	const location = useLocation();
	const pathname = generatePath(route);
	const state = useMemo((): TNavigationState | undefined => {
		const currentState = location.state as TNavigationState;
		return {
			backgroundLocation: modalRoutes.includes(route) ? currentState?.backgroundLocation || location : undefined,
			previousLocation: location,
		};
	}, [location, route]);

	return useMemo(
		(): NavigateProps => ({
			to: {pathname, search},
			replace: true,
			state,
		}),
		[pathname, search, state],
	);
};

export default useNavigateProps;
