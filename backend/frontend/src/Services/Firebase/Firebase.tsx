import React, {ReactNode} from 'react';
import {FirebaseProvider} from '@useweb/use-firebase';
import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyD362xbS8vlexCFIEVPptNlHqqY8BzIC6U',
	authDomain: 'webikit.firebaseapp.com',
	projectId: 'webikit',
	storageBucket: 'webikit.appspot.com',
	messagingSenderId: '665181477863',
	appId: '1:665181477863:web:2810c8452dffcf9e0f3b42',
	measurementId: 'G-H5S9316HLF',
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const envIsDev = process.env.NODE_ENV === 'development';

const vapidKey =
	'BME6zVJB32S2mLNAusFejnUzEya9mRapjxchPrcWDS1WqRNY3ust1ObVoUfaj0ysjiwAbx5uDdpwso3-ePXdMV4'; // vapidKey is required

type props = {
	children: ReactNode;
};

export default function Firebase({children}: props) {
	return (
		<FirebaseProvider
			firebaseConfig={firebaseConfig}
			firebaseApp={firebaseApp}
			envIsDev={envIsDev}
			messaging={messaging}
			messagingOptions={{
				vapidKey,
			}}
		>
			{children}
		</FirebaseProvider>
	);
}
