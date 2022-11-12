import { FirebaseOptions } from '@firebase/app'
import * as dotenv from 'dotenv'
import { isEmpty, isNil } from 'ramda'

dotenv.config()

export interface FirebaseConfig {
  options: FirebaseOptions
  serviceAccountKey: string
}

export function firebaseConfig(): FirebaseConfig {
  if (isNil(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) || isEmpty(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)) {
    throw new Error('.env should contain FIREBASE_SERVICE_ACCOUNT_KEY')
  }
  return {
    options: {
      apiKey: 'AIzaSyBH4AGOJffTQaellHIcYcUNrAtHdi8G-qE',
      authDomain: 'echo-83309.firebaseapp.com',
      projectId: 'echo-83309',
      storageBucket: 'echo-83309.appspot.com',
      messagingSenderId: '573093120800',
      appId: '1:573093120800:web:a0011e8639ebd388b76545',
      measurementId: 'G-MKKLYPQ9R7',
      databaseURL: 'https://echo-83309.firebaseio.com',
    },
    serviceAccountKey: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
  }
}
