'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import type { Address } from '@echo/model/types/address'
import { equals, isNil } from 'ramda'
import { generateNonce } from 'siwe'

type GetWalletStatusReturn =
  | {
      status: WalletStatus.NeedsSignature
      nonce: string
    }
  | {
      status: Exclude<WalletStatus, WalletStatus.NeedsSignature>
    }

export async function getWalletStatus(wallet: Address): Promise<GetWalletStatusReturn> {
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  await initializeFirebase()
  const userSnapshot = await getUserSnapshotByUsername(authUser)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  const user = userSnapshot.data()
  if (!isNil(user.wallet)) {
    if (equals(user.wallet, wallet)) {
      return { status: WalletStatus.Linked }
    }
    return { status: WalletStatus.Unavailable }
  }
  const existingOwner = await getUserByWallet(wallet)
  if (!isNil(existingOwner)) {
    return { status: WalletStatus.LinkedToOtherUser }
  }
  const nonce = await getNonce(userSnapshot.id)
  if (isNil(nonce)) {
    // for backward compatibility
    const { data } = await addNonce({ userId: userSnapshot.id, nonce: generateNonce() })
    return { status: WalletStatus.NeedsSignature, nonce: data.nonce }
  }
  return { status: WalletStatus.NeedsSignature, nonce: nonce.nonce }
}
