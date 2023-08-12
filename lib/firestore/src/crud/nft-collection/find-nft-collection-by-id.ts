import { getFirestoreNftCollectionData } from '../../data/nft-collection/get-firestore-nft-collection-data'

export const findNftCollectionById = (id: string) => getFirestoreNftCollectionData(id)
