import { firestore } from '../../services'

export const getCollectionGroup = (collectionId: string) => firestore().collectionGroup(collectionId)
