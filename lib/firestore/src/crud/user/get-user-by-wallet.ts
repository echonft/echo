import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil } from 'ramda'

export async function getUserByWallet(wallet: Wallet) {
  const document = await getWalletByAddress(wallet)
  if (isNil(document)) {
    throw `wallet ${JSON.stringify(wallet)} does not exist`
  }
  return getUserById(document.userId)
}
