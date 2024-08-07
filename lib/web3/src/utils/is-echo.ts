import type { Wallet } from '@echo/model/types/wallet'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { equals } from 'ramda'

export function isEcho(wallet: Wallet): boolean {
  return equals(wallet.address, getEchoAddress(wallet.chain))
}
