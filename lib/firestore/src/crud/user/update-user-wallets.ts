import { updateUser } from './update-user'
import { Wallet } from '@echo/firestore-types'

export const updateUserWallets = (id: string, wallets: Wallet[]) => updateUser(id, { wallets })
