import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getNftsForOwnerAndCollection(username: Username, collectionSlug: Slug): Promise<NftDocument[]> {
  return pipe(
    nftsCollection,
    queryWhere('collection.slug', '==', collectionSlug),
    queryWhere('owner.username', '==', username),
    queryOrderBy('tokenId'),
    getQueryData
  )()
}
