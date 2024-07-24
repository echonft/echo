import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryLimit } from '@echo/firestore/helpers/crud/query/query-limit'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { isEvmChain } from '@echo/utils/helpers/chains/is-evm-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { allPass, always, andThen, assoc, complement, isNotNil, pipe, propEq, toLower, when } from 'ramda'

// TODO add a flag to only compare with EVM - we will want a chains equal check at some point
// also, we should probably simply create wallets for all supported EVM chains when a user adds a wallet
// it would make things much easier
export function getWalletSnapshotByAddress(
  wallet: Wallet
): Promise<Nullable<QueryDocumentSnapshot<WalletDocumentData>>> {
  if (isEvmChain(wallet.chain)) {
    return pipe(
      getWalletsCollectionReference,
      queryWhere<WalletDocumentData>('address', '==', toLower(wallet.address)),
      queryWhere<WalletDocumentData>('isEvm', '==', true),
      queryLimit(1),
      getQueryUniqueDocumentSnapshot
    )()
  }
  return pipe(
    getWalletsCollectionReference,
    queryWhere<WalletDocumentData>('address', '==', toLower(wallet.address)),
    queryWhere<WalletDocumentData>('chain', '==', wallet.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getWalletByAddress(wallet: Wallet): Promise<Nullable<WalletDocumentData>> {
  const { chain } = wallet
  const isEvm = isEvmChain(chain)
  return pipe(
    getWalletSnapshotByAddress,
    andThen<Nullable<QueryDocumentSnapshot<WalletDocumentData>>, Nullable<WalletDocumentData>>(
      pipe<
        [Nullable<QueryDocumentSnapshot<WalletDocumentData>>],
        Nullable<WalletDocumentData>,
        Nullable<WalletDocumentData>
      >(
        getDocumentSnapshotData<WalletDocumentData>,
        when(
          allPass([isNotNil, always(isEvm), complement(propEq(chain, 'chain'))]) as (
            obj: Nullable<WalletDocumentData>
          ) => boolean,
          assoc('chain', chain)
        )
      )
    )
  )(wallet)
}
