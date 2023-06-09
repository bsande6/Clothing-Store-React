import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider}
 from 'firebase/auth'; 

 import {
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCeORz6sbO2-Q2Ol1s3ae2k78Ee5vGKbB0",
    authDomain: "clothing-db-80f1d.firebaseapp.com",
    projectId: "clothing-db-80f1d",
    storageBucket: "clothing-db-80f1d.appspot.com",
    messagingSenderId: "108602510485",
    appId: "1:108602510485:web:432603a0ef0424556c1f9c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            }) 
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
};




