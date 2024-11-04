import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OwnedNftDocument } from '@echo/firestore/types/model/nft-document'
import type { Address } from '@echo/model/types/address'
import { pipe } from 'ramda'

export function getNftsForWallet(wallet: Address): Promise<OwnedNftDocument[]> {
  return pipe(nftsCollection, queryWhere('owner.wallet', '==', wallet), getQueryData)() as Promise<OwnedNftDocument[]>
}
