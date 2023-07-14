import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation, generatePath, Location} from 'react-router';
import EnumRoutes from '../../Routes/EnumRoutes';

export type TNavigationState = {
	backgroundLocation?: Location;
	previousLocation?: Location;
	bypassNavigationPrompt?: boolean;
};

export function useCloseModal() {
	const location = useLocation();
	const navigate = useNavigate();

	return useCallback(() => {
		const state = location.state as TNavigationState;

		navigate(state?.backgroundLocation || generatePath(EnumRoutes.HOME), {replace: true});
	}, [location, navigate]);
}
