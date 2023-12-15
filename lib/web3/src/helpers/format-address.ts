import { getAddress } from 'viem'

export function formatAddress(args: { address: string; chainId?: number }) {
  return getAddress(args.address, args.chainId)
}
