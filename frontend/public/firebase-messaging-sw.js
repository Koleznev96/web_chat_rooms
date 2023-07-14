// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: 'AIzaSyD362xbS8vlexCFIEVPptNlHqqY8BzIC6U',
	authDomain: 'webikit.firebaseapp.com',
	projectId: 'webikit',
	storageBucket: 'webikit.appspot.com',
	messagingSenderId: '665181477863',
	appId: '1:665181477863:web:2810c8452dffcf9e0f3b42',
	measurementId: 'G-H5S9316HLF',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
