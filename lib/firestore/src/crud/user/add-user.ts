import { getUserSnapshotByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function addUser(wallet: Wallet): Promise<string> {
  const snapshot = await getUserSnapshotByWallet(wallet)
  if (!isNil(snapshot)) {
    return snapshot.id
  }
  return setReference({
    collectionReference: usersCollection(),
    data: { wallet } as UserDocument
  })
}
