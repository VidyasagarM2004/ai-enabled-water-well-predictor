import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDBalcLL2lTRMqxs8bAZ_Qj-_46GKix-wk",
  authDomain: "water-well-predictor.firebaseapp.com",
  projectId: "water-well-predictor",
  storageBucket: "water-well-predictor.firebasestorage.app",
  messagingSenderId: "892218500805",
  appId: "1:892218500805:web:8f71bcf656974201e132ac",
  measurementId: "G-1TM33BXBNY"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)