import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { pipe } from 'ramda'

export function getNftsForOwner(username: string): Promise<OwnedNft[]> {
  return pipe(
    getNftsCollectionReference,
    queryWhere('owner.username', '==', username),
    queryOrderBy('tokenId'),
    getQueryData
  )() as Promise<OwnedNft[]>
}
