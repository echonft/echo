import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletSnapshot } from '@echo/firestore/crud/wallet/get-wallet'
import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Username } from '@echo/model/types/username'
import type { Wallet } from '@echo/model/types/wallet'
import { assoc, isNil } from 'ramda'

export async function addWallet(username: Username, wallet: Wallet): Promise<NewDocument<WalletDocument>> {
  const walletSnapshot = await getWalletSnapshot(wallet)
  const userSnapshot = await getUserSnapshotByUsername(username)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  if (!isNil(walletSnapshot)) {
    return Promise.reject(Error(WalletError.Exists))
  }
  const walletData = assoc('userId', userSnapshot.id, wallet)
  const id = await setReference({
    collectionReference: walletsCollection(),
    data: walletData
  })
  return { id, data: walletData }
}
