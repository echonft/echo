import { isAddress as ViemIsAddress } from 'viem'

export function isAddress(address: string) {
  return ViemIsAddress(address)
}
