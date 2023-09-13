import { updateUser } from '@echo/firestore/crud/user/update-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'

export async function updateUserWallets(id: string, wallets: FirestoreWallet[]) {
  return await updateUser(id, { wallets })
}
