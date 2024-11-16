'use server'

import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { Address } from '@echo/model/types/address'
import { addressSchema } from '@echo/model/validators/address-schema'
import { isNil } from 'ramda'

export async function walletExists(address: Address): Promise<boolean> {
  const parsedAddress = addressSchema.parse(address)
  const user = await getUserByWallet(parsedAddress)
  return !isNil(user)
}
