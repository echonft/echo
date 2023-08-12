import { getFirestoreNftCollectionRefById } from '../../data/nft-collection/get-firestore-nft-collection-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { FirestoreNftPrototype } from '../../types/prototypes/nft/firestore-nft-prototype'
import { isNil } from 'ramda'

export const buildNft: FirestoreBuilder<FirestoreNftPrototype, FirestoreNft> = (prototype) => {
  const collectionRef = getFirestoreNftCollectionRefById(prototype.collectionId)
  if (isNil(collectionRef)) {
    return Promise.reject('collection not found')
  }
  const userRef = getFirestoreUserRefById(prototype.ownerId)
  if (isNil(userRef)) {
    return Promise.reject('user not found')
  }
  return Promise.resolve({
    name: prototype.name,
    collection: collectionRef,
    owner: userRef,
    tokenType: prototype.tokenType,
    tokenId: prototype.tokenId,
    balance: prototype.balance,
    attributes: prototype.attributes,
    description: prototype.description,
    pictureUrl: prototype.pictureUrl,
    thumbnailUrl: prototype.thumbnailUrl
  } as unknown as FirestoreNft)
}
