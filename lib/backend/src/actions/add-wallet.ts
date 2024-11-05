'use server'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { addUserWalletArgsSchema } from '@echo/backend/validators/add-user-wallet-args-schema'
import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { addUserWallet } from '@echo/firestore/crud/user/add-user-wallet'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { UserError } from '@echo/model/constants/errors/user-error'
import type { Address } from '@echo/model/types/address'
import { assoc, isNil } from 'ramda'
import { generateNonce } from 'siwe'

interface AddUserWalletArgs {
  message: string
  signature: string
  wallet: Address
}

export async function addWallet(args: AddUserWalletArgs): Promise<void> {
  await initializeFirebase()
  const authUser = await getAuthUser()
  if (isNil(authUser)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  const userSnapshot = await getUserSnapshotByUsername(authUser)
  if (isNil(userSnapshot)) {
    return Promise.reject(Error(UserError.NotFound))
  }
  let nonce = await getNonce(userSnapshot.id)
  if (isNil(nonce)) {
    // for backward compatibility
    const newNonce = await addNonce({ userId: userSnapshot.id, nonce: generateNonce() })
    nonce = newNonce.data
  }
  const wallet = await addUserWalletArgsSchema.parseAsync(assoc('nonce', nonce.nonce, args))
  await addUserWallet({
    userId: userSnapshot.id,
    wallet
  })
}
