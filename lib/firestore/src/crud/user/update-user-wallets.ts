import { Wallet } from '../../types/model/wallet'
import { updateUser } from './update-user'

export const updateUserWallets = (userId: string, wallets: Wallet[]) => updateUser(userId, { wallets })
