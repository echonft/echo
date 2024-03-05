import type { Wallet } from '@echo/model/types/wallet'
import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { toLower } from 'ramda'

export function getWalletMock(): Wallet {
  return { chainId: SEPOLIA_CHAIN_ID, address: toLower('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e') }
}
