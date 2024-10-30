import { noncesCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryUniqueData } from '@echo/firestore/helpers/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe, toLower } from 'ramda'

export function getNonce(wallet: Contract): Promise<Nullable<NonceDocument>> {
  return pipe(
    noncesCollection,
    queryWhere('wallet.address', '==', toLower(wallet.address)),
    queryWhere('wallet.chain', '==', wallet.chain),
    getQueryUniqueData
  )()
}
