import { FirestoreNftData, FirestoreNftPrototype, nftFirestoreData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const mockAddNft = (_nftPrototype: FirestoreNftPrototype): Promise<R.Result<FirestoreNftData, Error>> => {
  return Promise.resolve(R.fromNullable(nftFirestoreData['QFjMRNChUAHNswkRADXh'], new Error('invalid data')))
}
