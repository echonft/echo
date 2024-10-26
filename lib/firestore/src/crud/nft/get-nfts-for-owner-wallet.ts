import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'
import { pipe } from 'ramda'

interface GetNftsForOwnerWalletArgs {
  address: Address
  chain: Chain
}

export function getNftsForOwnerWallet({ address, chain }: GetNftsForOwnerWalletArgs): Promise<OwnedNftDocument[]> {
  return pipe(
    nftsCollection,
    queryWhere('owner.wallet', '==', address),
    queryWhere('collection.contract.chain', '==', chain),
    getQueryData
  )() as Promise<OwnedNftDocument[]>
}
