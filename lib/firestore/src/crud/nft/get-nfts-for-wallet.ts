import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { pipe } from 'ramda'

export function getNftsForWallet(args: Record<'wallet', Wallet>): Promise<OwnedNft[]> {
  const { wallet } = args
  return pipe(
    getNftsCollectionReference<true>,
    queryWhere('owner.wallet.chain', '==', wallet.chain),
    queryWhere('owner.wallet.address', '==', wallet.address),
    getQueryData
  )(true) as Promise<OwnedNft[]>
}
