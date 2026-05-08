import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAe7fm6ir_lpxDyoIfNBlH7PJaftxV2P0s',
	authDomain: 'cuet-me-pyq-data.firebaseapp.com',
	projectId: 'cuet-me-pyq-data',
	storageBucket: 'cuet-me-pyq-data.firebasestorage.app',
	messagingSenderId: '832605587905',
	appId: '1:832605587905:web:ff494a7db809df77b04740'
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
