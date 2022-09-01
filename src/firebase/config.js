import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD041udhCN7MSIbOCmhJnwGxqJEy9g8Hss",
    authDomain: "project-management-app-d0667.firebaseapp.com",
    projectId: "project-management-app-d0667",
    storageBucket: "project-management-app-d0667.appspot.com",
    messagingSenderId: "989054704061",
    appId: "1:989054704061:web:bae65c16356fd0ae375ad4"
};

//init firebase app
const app = initializeApp(firebaseConfig)

//init firestore
const db = getFirestore(app)

//init firebase storage
const storage = getStorage(app)

//init auth
const auth = getAuth(app)

//init google auth
const provider = new GoogleAuthProvider()

export { db, auth, provider, storage }