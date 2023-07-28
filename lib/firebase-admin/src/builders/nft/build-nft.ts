import { getFirestoreNftCollectionRefById } from '../../data/nft-collection/get-firestore-nft-collection-ref-by-id'
import { getFirestoreUserRefById } from '../../data/user/get-firestore-user-ref-by-id'
import { FirestoreBuilder, FirestoreNft, FirestoreNftPrototype } from '@echo/firestore'
import { isNil } from 'ramda'

export const buildNft: FirestoreBuilder<FirestoreNftPrototype, FirestoreNft> = (prototype) => {
  const collectionRef = getFirestoreNftCollectionRefById(prototype.collectionId)
  if (isNil(collectionRef)) {
    return Promise.reject('collection not found')
  }
  return collectionRef
    .get()
    .then((collectionSnapshot) => {
      if (!collectionSnapshot.exists) {
        return Promise.reject('collection not found')
      }
      const ownerRef = getFirestoreUserRefById(prototype.ownerId)
      if (isNil(ownerRef)) {
        return Promise.reject('user not found')
      }
      return ownerRef
        .get()
        .then((userSnapshot) => {
          if (!userSnapshot.exists) {
            return Promise.reject('user not found')
          }
          return Promise.resolve({
            name: prototype.name,
            collection: collectionRef,
            tokenType: prototype.tokenType,
            tokenId: prototype.tokenId,
            balance: prototype.balance,
            attributes: prototype.attributes,
            owner: ownerRef,
            description: prototype.description,
            pictureUrl: prototype.pictureUrl,
            thumbnailUrl: prototype.thumbnailUrl
          } as unknown as FirestoreNft)
        })
        .catch(() => Promise.reject('user not found'))
    })
    .catch(() => Promise.reject('collection not found'))
}
