import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreNftCollection } from '../../../src/types/model/collections/nft-collection/firestore-nft-collection'
import { nftCollectionFirestoreData } from './nft-collection-firestore-data'
import { always, omit } from 'ramda'

export const nftCollectionSnapshot: { [key: string]: FirestoreSnapshot<FirestoreNftCollection> } = {
  Rc8pLQXxgyQGIRL0fr13: {
    ref: {
      path: 'nft-collections/Rc8pLQXxgyQGIRL0fr13'
    },
    id: 'Rc8pLQXxgyQGIRL0fr13',
    exists: true,
    data: always(omit(['refPath', 'id'], nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']))
  } as unknown as FirestoreSnapshot<FirestoreNftCollection>,
  '1aomCtnoesD7WVll6Yi1': {
    ref: {
      path: 'nft-collections/1aomCtnoesD7WVll6Yi1'
    },
    id: '1aomCtnoesD7WVll6Yi1',
    exists: true,
    data: always(omit(['refPath', 'id'], nftCollectionFirestoreData['1aomCtnoesD7WVll6Yi1']))
  } as unknown as FirestoreSnapshot<FirestoreNftCollection>
}
