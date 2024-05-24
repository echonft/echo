import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function assertWalletExists(wallet: Wallet): Promise<boolean> {
  const savedWallet = await getWalletByAddress(wallet)
  return !isNil(savedWallet)
}
