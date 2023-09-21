import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { nftFields } from '@echo/firestore/types/model/nft/nft-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map } from 'ramda'

export async function getNftsForCollection(collectionSlug: string, constraints?: QueryConstraints) {
  let query = firestoreApp()
    .collection(CollectionName.NFTS)
    .where('collection.slug', '==', collectionSlug)
    .withConverter(nftDataConverter)

  query = addConstraintsToQuery(query, constraints, nftFields)
  const querySnapshot = await query.get()

  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return [] as FirestoreNft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNft[]
}
