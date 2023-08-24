import { Wallet } from '../../types/model/wallet'
import { updateUser } from './update-user'

export const updateUserWallets = (id: string, wallets: Wallet[]) => updateUser(id, { wallets })
