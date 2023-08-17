import { getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const firestore = () => getFirestore(getApp())
