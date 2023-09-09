import { ServerError } from '../error/server-error'
import { getUserWalletAddresses as firestoreGetUserWalletAddresses } from '@echo/firestore'
import { User } from '@echo/firestore-types'

export function getUserWalletAddresses(chainId: number, user: Partial<User>) {
  try {
    return firestoreGetUserWalletAddresses(chainId, user)
  } catch (e) {
    throw new ServerError(`error getting wallet addresses for user ${JSON.stringify(user)} on chain id ${chainId}`, e)
  }
}
