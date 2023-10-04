import { getNftsCollection } from '@echo/firestore/helpers/collection/get-nfts-collection'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { nftFields } from '@echo/firestore/types/model/nft/firestore-nft'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'

export async function getNftsForOwner(username: string, constraints?: QueryConstraints) {
  let query = getNftsCollection().where('owner.username', '==', username)
  query = addConstraintsToQuery(query, constraints, nftFields)
  return await getQueryDocumentsData(query)
}
