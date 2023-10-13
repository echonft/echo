import { nftCollectionFields } from '@echo/firestore/constants/fields/nft-collection/nft-collection-fields'
import { getNftCollectionsCollection } from '@echo/firestore/helpers/collection/get-nft-collections-collection'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import type { Query } from 'firebase-admin/lib/firestore'

export async function getAllNftCollections(constraints?: QueryConstraints) {
  let query = getNftCollectionsCollection() as Query<Collection>
  query = addConstraintsToQuery(query, constraints, nftCollectionFields)
  return await getQueryDocumentsData(query)
}
