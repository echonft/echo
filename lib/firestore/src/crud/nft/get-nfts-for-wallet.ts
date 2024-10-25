import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { Wallet } from '@echo/model/types/wallet'
import { pipe } from 'ramda'

export function getNftsForWallet(args: Record<'wallet', Wallet>): Promise<NftDocument[]> {
  const { wallet } = args
  return pipe(nftsCollection, queryWhere('owner.wallet', '==', wallet.address), getQueryData)()
}
