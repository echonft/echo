import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { PartialCollection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { pipe } from 'ramda'

interface GetNftsForWalletAndCollectionArgs<T extends Wallet> {
  collection: PartialCollection
  wallet: Partial<T> & Required<Pick<Wallet, 'address' | 'chain'>>
}

export function getNftsForWalletAndCollection<T extends Wallet>(
  args: GetNftsForWalletAndCollectionArgs<T>
): Promise<Nft[]> {
  const { collection, wallet } = args
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', collection.slug),
    queryWhere<Nft>('owner.wallet.address', '==', wallet.address),
    queryWhere<Nft>('owner.wallet.chain', '==', wallet.chain),
    getQueryData
  )()
}
