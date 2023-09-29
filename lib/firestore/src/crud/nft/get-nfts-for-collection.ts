import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { nftFields } from '@echo/firestore/types/model/nft/nft-document-data'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

export async function getNftsForCollection(collectionSlug: string, constraints?: QueryConstraints) {
  let query = firestoreApp()
    .collection(CollectionName.NFTS)
    .where('collection.slug', '==', collectionSlug)
    .withConverter(nftDataConverter)

  query = addConstraintsToQuery(query, constraints, nftFields)
  return await getQueryDocumentsData(query)
}
