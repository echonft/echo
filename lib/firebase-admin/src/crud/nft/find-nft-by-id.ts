import { getFirestoreNftData } from '../../data/nft/get-firestore-nft-data'

export const findNftById = (id: string) => getFirestoreNftData(id)
