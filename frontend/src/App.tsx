import React, {lazy, Suspense} from 'react';
import Spinner from './Components/Spinner/Spinner';
import Firebase from './Services/Firebase/Firebase';

export const AppDesktop = lazy(() => import('./AppDesktop'));

const App = () => (
	// <Firebase>
	<Suspense fallback={<Spinner />}>
		<AppDesktop />
	</Suspense>
	// </Firebase>
);

export default App;
