import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryOrderBy } from '@echo/firestore/helpers/crud/query/query-order-by'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getNftsForOwner(username: string): Promise<OwnedNft[]> {
  return pipe(
    getNftsCollectionReference<true>,
    queryWhere<Nft>('owner.username', '==', username),
    queryOrderBy<Nft>('tokenId'),
    getQueryData
  )(true) as Promise<OwnedNft[]>
}
