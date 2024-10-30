import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import type { Contract } from '@echo/model/types/contract'
import dayjs from 'dayjs'
import { isNil, pipe } from 'ramda'
import { generateNonce } from 'siwe'

export interface GetWalletStatusArgs {
  wallet: Contract
}

export interface GetWalletStatusReturn {
  status: WalletStatus
  nonce?: string
  expiresAt?: string
}

export async function getWalletStatus({ wallet }: GetWalletStatusArgs): Promise<GetWalletStatusReturn> {
  'use server'
  const existingWallet = await pipe(walletFromContract, getWallet)(wallet)
  if (!isNil(existingWallet)) {
    return { status: WalletStatus.Linked }
  }
  const expiresAt = dayjs().add(5, 'minute')
  const nonce = await addNonce({
    wallet,
    nonce: generateNonce(),
    expiresAt: expiresAt.unix()
  })
  return { status: WalletStatus.NeedsSignature, nonce: nonce.nonce, expiresAt: expiresAt.toISOString() }
}
