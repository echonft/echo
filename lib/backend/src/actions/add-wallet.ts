'use server'
import { getAuthUserNonce } from '@echo/backend/actions/helpers/get-auth-user-nonce'
import { addUserWalletArgsSchema } from '@echo/backend/validators/add-user-wallet-args-schema'
import { addUserWallet } from '@echo/firestore/crud/user/add-user-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Contract } from '@echo/model/types/contract'
import { assoc } from 'ramda'

interface AddUserWalletArgs extends Contract {
  message: string
  signature: string
}

export async function addWallet(args: AddUserWalletArgs): Promise<void> {
  await initializeFirebase()
  const { userId, nonce } = await getAuthUserNonce()
  const wallet = await addUserWalletArgsSchema.parseAsync(assoc('nonce', nonce, args))
  await addUserWallet({
    userId,
    wallet
  })
}
