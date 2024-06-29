import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { PartialCollection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { pipe } from 'ramda'

interface GetNftsForWalletAndCollectionArgs {
  collection: PartialCollection
  wallet: PartialWallet
}

export function getNftsForWalletAndCollection(args: GetNftsForWalletAndCollectionArgs): Promise<Nft[]> {
  const { collection, wallet } = args
  return pipe(
    getNftsCollectionReference,
    queryWhere<Nft>('collection.slug', '==', collection.slug),
    queryWhere<Nft>('owner.wallet.address', '==', wallet.address),
    queryWhere<Nft>('owner.wallet.chain', '==', wallet.chain),
    getQueryData
  )()
}
