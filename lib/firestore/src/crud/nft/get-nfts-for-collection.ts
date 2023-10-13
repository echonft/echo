import { nftFields } from '@echo/firestore/constants/fields/nft/nft-fields'
import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

export async function getNftsForCollection(collectionSlug: string, constraints?: QueryConstraints) {
  let query = getNftsCollection().where('collection.slug', '==', collectionSlug)
  query = addConstraintsToQuery(query, constraints, nftFields)
  return await getQueryDocumentsData(query)
}
