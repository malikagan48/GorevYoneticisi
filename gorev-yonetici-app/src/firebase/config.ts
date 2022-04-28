import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQhLlENIC2sO2zQKgKl1Y-knwJB7JA5yk",
    authDomain: "ionic-vue-9fac1.firebaseapp.com",
    projectId: "ionic-vue-9fac1",
    storageBucket: "ionic-vue-9fac1.appspot.com",
    messagingSenderId: "330664449387",
    appId: "1:330664449387:web:17cac643d1ef8e47c3682e"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

export default db;