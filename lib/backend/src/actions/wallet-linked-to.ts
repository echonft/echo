'use server'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'

export async function walletLinkedTo(wallet: Address): Promise<Nullable<string>> {
  await initializeFirebase()
  const user = await getUserByWallet(wallet)
  return user?.username
}
