import { deleteNonce } from '@echo/firestore/crud/nonce/delete-nonce'
import { getNonceSnapshot } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

interface AddUserWalletArgs {
  userId: string
  wallet: Wallet
}

interface AddUserWalletReturn {
  user: UserDocument
  wallet?: NewDocument<Wallet>
}

export async function addUserWallet({ userId, wallet }: AddUserWalletArgs): Promise<AddUserWalletReturn> {
  const user = await getUserById(userId)
  if (isNil(user)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  if (!isNil(user.wallet)) {
    return Promise.reject(Error(WalletError.Exists))
  }
  const existingWalletOwner = await getUserByWallet(wallet)
  if (!isNil(existingWalletOwner)) {
    return Promise.reject(Error(WalletError.Exists))
  }
  const updatedUser = await updateReference({
    collectionReference: usersCollection(),
    id: userId,
    data: { wallet }
  })
  const nonceSnapshot = await getNonceSnapshot(userId)
  if (!isNil(nonceSnapshot)) {
    await deleteNonce(nonceSnapshot.id)
  }
  return { user: updatedUser }
}
