import { getFirestoreNftCollectionData } from '../../data/nft-collection/get-firestore-nft-collection-data'

export const findCollectionById = (id: string) => getFirestoreNftCollectionData(id)
