// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD362xbS8vlexCFIEVPptNlHqqY8BzIC6U',
	authDomain: 'webikit.firebaseapp.com',
	projectId: 'webikit',
	storageBucket: 'webikit.appspot.com',
	messagingSenderId: '665181477863',
	appId: '1:665181477863:web:2810c8452dffcf9e0f3b42',
	measurementId: 'G-H5S9316HLF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const fetchToken = (setTokenFound: (status: string) => void) => {
	return getToken(messaging, {
		vapidKey:
			'BME6zVJB32S2mLNAusFejnUzEya9mRapjxchPrcWDS1WqRNY3ust1ObVoUfaj0ysjiwAbx5uDdpwso3-ePXdMV4',
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				setTokenFound(currentToken);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log('No registration token available. Request permission to generate one.');
				setTokenFound('');
				// shows on the UI that permission is required
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
};

// export onMessage(messaging, (payload) => {
// 	console.log('Message received. ', payload);
// });

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
