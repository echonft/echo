import { getFirestoreNonceData } from '../../data/nonce/get-firestore-nonce-data'
import { mapNonce } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findNonceForUser = (userId: string) => {
  return pipe(getFirestoreNonceData, mapNonce, R.fromPromise<string>)(userId)
}
