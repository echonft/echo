import { updateUser } from './update-user'
import { Wallet } from '@echo/firestore-types'

export async function updateUserWallets(id: string, wallets: Wallet[]) {
  return await updateUser(id, { wallets })
}
