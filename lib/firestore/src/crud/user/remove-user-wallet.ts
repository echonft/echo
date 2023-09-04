import { findUserById } from './find-user-by-id'
import { updateUserWallets } from './update-user-wallets'
import { Wallet } from '@echo/firestore-types'
import { includes, isNil, without } from 'ramda'

export const removeUserWallet = async (id: string, wallet: Wallet) => {
  const user = await findUserById(id)
  if (isNil(user)) {
    throw Error('invalid user id')
  }
  const { wallets } = user
  if (includes(wallet, wallets)) {
    await updateUserWallets(id, without([wallet], wallets))
  }
}
