import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

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

export const fetchToken = (setTokenFound: (status: boolean) => void) => {
	console.log('1111111111');
	return getToken(messaging, {
		vapidKey:
			'BME6zVJB32S2mLNAusFejnUzEya9mRapjxchPrcWDS1WqRNY3ust1ObVoUfaj0ysjiwAbx5uDdpwso3-ePXdMV4',
	})
		.then((currentToken) => {
			console.log('2222222222222');
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				setTokenFound(true);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log('No registration token available. Request permission to generate one.');
				setTokenFound(false);
				// shows on the UI that permission is required
			}
			console.log('33333333333333333');
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
	console.log('444444444444');
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log('onMessage!!!!!');
			resolve(payload);
		});
	});
