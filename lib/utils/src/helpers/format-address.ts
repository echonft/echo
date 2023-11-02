import { getAddress } from 'viem'

export function formatAddress(address: string, chainId: number) {
  return getAddress(address, chainId)
}
