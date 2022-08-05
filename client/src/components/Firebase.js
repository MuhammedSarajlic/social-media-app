import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDV_GUSpjEqSankx5UhZ7K67ST2AA_xSVI',
  authDomain: 'social-media-app-7a540.firebaseapp.com',
  databaseURL:
    'https://social-media-app-7a540-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'social-media-app-7a540',
  storageBucket: 'social-media-app-7a540.appspot.com',
  messagingSenderId: '586212491922',
  appId: '1:586212491922:web:67ae92b05dbc8aa7311c4b',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
