import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

export function getNftsForWallet(args: Record<'wallet', PartialWallet>): Promise<Nft[]> {
  const { wallet } = args
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('owner.wallet.chain', '==', wallet.chain),
    queryWhere<Nft>('owner.wallet.address', '==', wallet.address),
    getQueryData
  )()
}
