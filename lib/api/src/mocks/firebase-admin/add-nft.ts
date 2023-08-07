import { FirestoreNftData, FirestoreNftPrototype, nftFirestoreData } from '@echo/firestore'

export const mockAddNft = (_nftPrototype: FirestoreNftPrototype): Promise<FirestoreNftData> => {
  return Promise.resolve(nftFirestoreData['QFjMRNChUAHNswkRADXh']!)
}
