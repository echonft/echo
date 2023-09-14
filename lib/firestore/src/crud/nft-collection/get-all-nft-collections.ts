import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection-data-converter'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import { nftCollectionFields } from '@echo/firestore/types/model/nft-collection-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Query } from 'firebase-admin/firestore'
import { invoker, map } from 'ramda'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  let query = firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .withConverter(nftCollectionDataConverter) as Query<FirestoreNftCollection>

  query = addConstraintsToQuery(query, constraints, nftCollectionFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as FirestoreNftCollection[]
  }
  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNftCollection[]
}
