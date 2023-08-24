import { firestore } from './firestore'

export const terminate = () => firestore().terminate()
