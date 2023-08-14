import { nftFirestoreData } from '../nft-firestore-data'
import { FirestoreNftData, FirestoreNftPrototype } from '@echo/firestore'

export const mockAddNft = (_nftPrototype: FirestoreNftPrototype): Promise<FirestoreNftData> => {
  return Promise.resolve(nftFirestoreData['QFjMRNChUAHNswkRADXh']!)
}
