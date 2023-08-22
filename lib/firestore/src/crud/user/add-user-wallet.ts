import { Wallet } from '../../types/model/wallet'
import { findUserById } from './find-user-by-id'
import { updateUserWallets } from './update-user-wallets'
import { includes, isNil } from 'ramda'

export const addUserWallet = async (id: string, wallet: Wallet) => {
  const user = await findUserById(id)
  if (isNil(user)) {
    throw Error('invalid user id')
  }
  const { wallets } = user
  if (!includes(wallet, wallets)) {
    await updateUserWallets(id, [wallet, ...wallets])
  }
}
