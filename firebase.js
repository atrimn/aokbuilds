// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmPUFZEJYfVA0FzNY1xMjSxyJbKdBbIrY',
  authDomain: 'aokbuilds.firebaseapp.com',
  projectId: 'aokbuilds',
  storageBucket: 'aokbuilds.appspot.com',
  messagingSenderId: '212033719225',
  appId: '1:212033719225:web:63adf7d29d597cad458468',
  measurementId: 'G-WH4R6QLQWW',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
const analytics = getAnalytics(app)
export const db = getFirestore()

// db
export const createBuild = async (build, buildName) => {
  // const querySnapshot = await getDocs(collection(db, 'rouge'))
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data())
  // })
  const res = await addDoc(collection(db, build[0].ability.class), {
    buildName: buildName,
    customBuild: build,
  })
  return res
}
