import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import type { Contract } from '@echo/model/types/contract'
import { pipe } from 'ramda'

export function getNftsForWallet({ address, chain }: Contract): Promise<OwnedNftDocument[]> {
  return pipe(
    nftsCollection,
    queryWhere('owner.wallet.address', '==', address),
    queryWhere('collection.contract.chain', '==', chain),
    getQueryData
  )() as Promise<OwnedNftDocument[]>
}
