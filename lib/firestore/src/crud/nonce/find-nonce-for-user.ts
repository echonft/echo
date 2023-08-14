import { getFirestoreNonceData } from '../../data/nonce/get-firestore-nonce-data'

export const findNonceForUser = (userId: string) => getFirestoreNonceData(userId)
