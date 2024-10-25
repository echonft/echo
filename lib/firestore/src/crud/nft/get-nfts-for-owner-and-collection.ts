import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'
import { pipe } from 'ramda'

export function getNftsForOwnerAndCollection(username: Username, collectionSlug: Slug): Promise<OwnedNft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere('collection.slug', '==', collectionSlug),
    queryWhere('owner.username', '==', username),
    queryOrderBy('tokenId'),
    getQueryData
  )() as Promise<OwnedNft[]>
}
