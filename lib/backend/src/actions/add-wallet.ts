import { getAuthUser } from '@echo/auth/helpers/get-auth-user'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import type { Contract } from '@echo/model/types/contract'
import type { Wallet } from '@echo/model/types/wallet'
import { domain } from '@echo/routing/constants/domain'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil } from 'ramda'
import { SiweMessage } from 'siwe'

export interface AddWalletArgs extends Contract {
  message: string
  signature: HexString
}

export async function addWallet({ address, chain, message, signature }: AddWalletArgs): Promise<Wallet> {
  'use server'

  async function validateSignature() {
    try {
      const siweMessage = new SiweMessage(message)
      const { data, success } = await siweMessage.verify({
        signature,
        domain
        // nonce
      })
      // if (!success) {
      //   return Promise.reject(Error(WalletError.SignatureInvalid))
      // }
      // return pipe(pick(['address', 'chain']), assoc('nonce', data.nonce))(params)
    } catch (_err) {
      return Promise.reject(Error(WalletError.SignatureInvalid))
    }
  }

  const user = await getAuthUser()
  if (isNil(user)) {
    return Promise.reject(Error(AuthError.Unauthorized))
  }
  const wallet = walletFromContract({ address, chain })
  const existingWallet = await getWallet(wallet)
  if (!isNil(existingWallet)) {
    const userSnapshot = await getUserSnapshotByUsername(user.username)
    if (existingWallet.userId === userSnapshot?.id) {
      return wallet
    }
    return Promise.reject(Error(AuthError.Forbidden))
  }
  await validateSignature()
}
