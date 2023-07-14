import {Params, Search} from 'react-router';
import {useMemo} from 'react';
import useNavigateProps from './useNavigateProps';
import EnumRoutes from '../../Routes/EnumRoutes';
import getRouterLinkForMui from './getRouterLinkForMui';
import PropertyHandler from '../../Lib/Redux/PropertyHandler';

const useRouterLinkForMui = (route: EnumRoutes, params?: Params, onClick?: PropertyHandler, search?: Search) => {
	const navigateProps = useNavigateProps(route, params, search);

	return useMemo(
		() =>
			getRouterLinkForMui({
				...navigateProps,
				onClick,
			}),
		[navigateProps, onClick],
	);
};

export default useRouterLinkForMui;
