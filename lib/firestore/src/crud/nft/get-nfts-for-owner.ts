import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft-data-converter'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { nftFields } from '@echo/firestore/types/model/nft-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { invoker, map } from 'ramda'

export async function getNftsForOwner(userId: string, constraints?: QueryConstraints) {
  let query = firestoreApp()
    .collection(CollectionName.NFTS)
    .where('owner.id', '==', userId)
    .withConverter(nftDataConverter)

  query = addConstraintsToQuery(query, constraints, nftFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as FirestoreNft[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as FirestoreNft[]
}
