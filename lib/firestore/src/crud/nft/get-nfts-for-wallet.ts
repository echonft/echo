import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { setPaginatedResult } from '@echo/firestore/helpers/pagination/set-paginated-result'
import type { PaginatedArgs } from '@echo/firestore/types/paginated-args'
import type { PaginatedResult } from '@echo/firestore/types/paginated-result'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { andThen, partial, pipe } from 'ramda'

export function getNftsForWalletPaginated<T extends Wallet>(
  args: PaginatedArgs & Record<'wallet', T>
): Promise<PaginatedResult<Nft>> {
  const { page, wallet } = args
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('owner.wallet.chainId', '==', wallet.chainId),
    queryWhere<Nft>('owner.wallet.address', '==', wallet.address),
    getQueryData,
    andThen(partial(setPaginatedResult, [page]))
  )()
}
