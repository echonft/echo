import { getFirestoreNonceData } from '../../data/nonce/get-firestore-nonce-data'
import { mapNonce } from '@echo/firestore'
import { pipe } from 'ramda'

export const findNonceForUser = (userId: string) => pipe(getFirestoreNonceData, mapNonce)(userId)
